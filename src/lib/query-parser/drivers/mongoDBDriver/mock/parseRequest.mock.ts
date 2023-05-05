import { Request } from 'express';
import { RequestQueryParams } from 'src/lib/query-parser/queryParserFactory.interface';
import { MongooseParams } from '../mongoDBDriver.interface';
import { getOptionsMock } from './getOptions.mock';
import { getPopulationsMock } from './getPopulation.mock';
import { getProjectionMock } from './getProjection.mock';

export const parseRequestMock = jest.fn((request: Request): MongooseParams => {
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
