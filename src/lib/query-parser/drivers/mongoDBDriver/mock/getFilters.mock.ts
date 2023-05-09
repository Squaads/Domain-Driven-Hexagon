import { transforms } from 'src/lib/query-parser/utils/transforms';
import { MongoFilters, MongoFiltersArray, MongoFiltersQuery } from '../MongoDBDriver.types';

export const getFiltersMock = (filters): MongoFilters => {
    const filtersArray = getFiltersArrayMock(filters);
    if (!filtersArray || filtersArray.length === 0) {
        return {};
    }
    return { $and: filtersArray };
};

export const getFiltersArrayMock = (filters): MongoFiltersArray => {
    return Object.entries(filters).reduce((filterQuery, [key, value]) => {
        let newKey = key;
        if (newKey.includes('_id')) newKey = key.replace(/^_/, '');
        if (newKey.startsWith('_')) {
            return filterQuery;
        }
        return [...filterQuery, getFilterQueryMock(newKey, value as string)];
    }, [] as { [key: string]: any }[]);
};

export const getFilterQueryMock = (key: string, value: string): MongoFiltersQuery => {
    const [keyName, operator] = key.split('_');

    const operatorMapping = {
        like: { [keyName]: { $regex: value, $options: 'i' } },
        in: () => {
            const keyNameArray = keyName.split('.');
            if (keyNameArray.length > 1) {
                return {
                    [keyNameArray[0]]: { $elemMatch: { [keyNameArray[1]]: value } },
                };
            }
            return { [keyName]: { $in: value.split(',') } };
        },
        undefined: { [keyName]: { $eq: transforms(value) } },
        default: { [keyName]: { [`$${operator}`]: transforms(value) } },
    };

    if (keyName === 'id') {
        operatorMapping.in = () => ({ _id: { $in: value.split(',') } });
    }

    const query = operatorMapping[operator] || operatorMapping.default;
    return typeof query === 'function' ? query() : query;
};
