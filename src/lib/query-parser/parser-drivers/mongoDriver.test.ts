import { Request } from 'express';
import { getOptionsMock } from './mock/getOptions.mock';
import { getPopulationsMock } from './mock/getPopulation.mock';
import { getProjectionMock } from './mock/getProjection.mock';
import { parseRequestMock } from './mock/parseRequest.mock';

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

        const parsedRequest = parseRequestMock(queryFromRequest);

        expect(parsedRequest).toEqual({
            options: { skip: 10, limit: 10, sort: { name: 1 } },
            populations: [{ path: 'user' }, { path: 'category' }],
            projections: 'name description',
        });
    });
});
