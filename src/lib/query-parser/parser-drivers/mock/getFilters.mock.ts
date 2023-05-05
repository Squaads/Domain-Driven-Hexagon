import { transforms } from '../../utils/transforms';
import { MongoFilters, MongoFiltersQuery } from '../MongoDBDriver.types';

export const getFiltersMock = jest.fn((filters: { [key: string]: string }): MongoFilters => {
    if (!filters) {
        return {};
    }
    const filtersArray = Object.entries(filters)
        .filter(([key]) => !key.startsWith('_'))
        .map(([key, value]) => getFilterQueryMock(key, value));

    return filtersArray.length ? { $and: filtersArray } : {};
});

export const getFilterQueryMock = jest.fn((key: string, value: string): MongoFiltersQuery => {
    const [keyName = key, operator] = key.split('_');
    const query = {};

    if (operator === 'like') {
        query[keyName] = { $regex: value, $options: 'i' };
    } else if (operator === 'in') {
        const [parentKey, childKey] = keyName.split('.');
        query[parentKey] = { $elemMatch: { [childKey]: value } };
    } else {
        query[keyName] = { [`$${operator || 'eq'}`]: transforms(value) };
    }

    return query;
});
