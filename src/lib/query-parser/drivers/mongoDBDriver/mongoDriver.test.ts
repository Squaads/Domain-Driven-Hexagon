import { Request } from 'express';
import { getOptionsMock } from './mock/getOptions.mock';
import { getPopulationsMock } from './mock/getPopulation.mock';
import { getProjectionMock } from './mock/getProjection.mock';
import { parseRequestMock } from './mock/parseRequest.mock';
import { getFilterQueryMock, getFiltersMock } from './mock/getFilters.mock';

describe('getOptions method', () => {
    it('should be return a MongoOption object with default values', () => {
        const options = { page: undefined, sort: undefined, limit: undefined, order: undefined };
        const parsedOptions = getOptionsMock(options);

        expect(parsedOptions).toEqual({ skip: 0, limit: 10, sort: undefined });
    });
    it('should be return a MongoOption object', () => {
        const options = { page: 1, sort: 'name', limit: 10, order: 1 };
        const parsedOptions = getOptionsMock(options);

        expect(parsedOptions).toEqual({ skip: 10, limit: 10, sort: { name: 1 } });
    });
});

describe('getPopulations method', () => {
    it('should be return an empty array', () => {
        const populations = undefined;
        const parsedPopulations = getPopulationsMock(populations);

        expect(parsedPopulations).toEqual([]);
    });
    it('should be return an array of MongoPopulations', () => {
        const populations = 'user,category';
        const parsedPopulations = getPopulationsMock(populations);

        expect(parsedPopulations).toEqual([{ path: 'user' }, { path: 'category' }]);
    });
    it('should be return an array of MongoPopulations', () => {
        const populations = ['user', 'category'];
        const parsedPopulations = getPopulationsMock(populations);

        expect(parsedPopulations).toEqual([{ path: 'user' }, { path: 'category' }]);
    });
});

describe('getProjection method', () => {
    it('should be return an empty string', () => {
        const projections = undefined;
        const parsedProjections = getProjectionMock(projections);

        expect(parsedProjections).toEqual('');
    });
    it('should be return a string of MongoProjections', () => {
        const projections = 'name,description';
        const parsedProjections = getProjectionMock(projections);

        expect(parsedProjections).toEqual('name description');
    });
    it('should be return a string of MongoProjections', () => {
        const projections = ['name', 'description'];
        const parsedProjections = getProjectionMock(projections);

        expect(parsedProjections).toEqual('name description');
    });
});

describe('getFilters method', () => {
    it('should be return an empty object', () => {
        const filters = "";
        const parsedFilters = getFiltersMock(filters);

        expect(parsedFilters).toEqual({});
    });

    it('should be return an object of MongoFilters', () => {
        const filters = {
            id: '123',
            name: 'John',
            age: '30',
            city: 'New York',
        };
        const result = getFiltersMock(filters);
        expect(result).toEqual({
            $and: [
                { id: { $eq: 123 } },
                { name: { $eq: 'John' } },
                { age: { $eq: 30 } },
                { city: { $eq: 'New York' } },
            ],
        });
    });
});

describe('getFilterQuery method', () => {
    it('should return a $regex query when the operator is "like"', () => {
        const query = getFilterQueryMock('name_like', 'john');
        expect(query).toEqual({ name: { $regex: 'john', $options: 'i' } });
    });

    it('should return an $elemMatch query when the operator is "in" and the key has a parent-child structure', () => {
        const query = getFilterQueryMock('address.city_in', 'new york');
        expect(query).toEqual({ address: { $elemMatch: { city: 'new york' } } });
    });

    it('should return a simple query with the operator when the operator is present', () => {
        const query = getFilterQueryMock('age_gt', '30');
        expect(query).toEqual({ age: { $gt: 30 } });
    });

    it('should return a simple query with the $eq operator when no operator is present', () => {
        const query = getFilterQueryMock('status', 'active');
        expect(query).toEqual({ status: { $eq: 'active' } });
    });

    it('should transform the value before using it in the query', () => {
        const query = getFilterQueryMock('createdAt_lt', '2021-01-01');
        expect(query).toEqual({ createdAt: { $lt: '2021-01-01' } });
    });
});

describe('parseRequest method', () => {
    it('should be return a MongooseParams object', () => {
        const queryFromRequest: Partial<Request> = {
            query: {
                _page: '1',
                _sort: 'name',
                _limit: '10',
                _order: '1',
                _show: 'name,description',
                _embed: 'user,category',
            },
        };

        const parsedRequest = parseRequestMock(queryFromRequest as Request);

        expect(parsedRequest).toEqual({
            options: { skip: 10, limit: 10, sort: { name: 1 } },
            populations: [{ path: 'user' }, { path: 'category' }],
            projections: 'name description',
        });
    });
});
