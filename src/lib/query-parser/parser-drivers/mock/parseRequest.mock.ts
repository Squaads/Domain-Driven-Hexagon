import { Request } from 'express';
import { RequestQueryParams } from '../../queryParserFactory.interface';
import { getOptionsMock } from './getOptions.mock';
import { getPopulationsMock } from './getPopulation.mock';
import { getProjectionMock } from './getProjection.mock';
import { MongooseParams } from '../MongoDBDriver.interface';

export const parseRequestMock = jest.fn((request: Partial<Request>):MongooseParams => {
    const { _page, _sort, _limit, _order, _show, _embed } = request.query as RequestQueryParams;

    const options = { page: _page, sort: _sort, limit: _limit, order: _order };
    const parsedOptions = getOptionsMock(options);

    const populations = _embed;
    const parsedPopulations = getPopulationsMock(populations);

    const projections = _show;
    const parsedProjections = getProjectionMock(projections);

    return {
        options: parsedOptions,
        populations: parsedPopulations,
        projections: parsedProjections,
    };
});
