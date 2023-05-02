import { Request } from 'express';
import { QueryParserInterface, RequestQueryParams } from '../queryParserFactory.interface';
import { RequestValidationResponse } from '../validation/requestValidationResponse';
import { defaultValues } from './defaults';
import { MongoOptions, MongooseParams } from './MongoDBDriver.interface';
import { MongoPopulations, MongoProjections } from './MongoDBDriver.types';

export class MongoDBParserDriver implements QueryParserInterface<MongooseParams | RequestValidationResponse> {
    private getOptions({ limit, page, sort, order }): MongoOptions {
        const skip = parseInt(page ?? 0, 10) * parseInt(limit ?? defaultValues.pageSize, 10);
        const parsedLimit = parseInt(limit ?? defaultValues.pageSize, 10);
        const parsedOrder = parseInt(order ?? defaultValues.order, 10);
        const sortValue = sort ? { [sort]: parsedOrder } : undefined;

        return { skip, limit: parsedLimit, sort: sortValue };
    }

    private getPopulations(populations): MongoPopulations {
        if (!populations) {
            return [];
        }
        if (Array.isArray(populations)) {
            return populations.map(path => ({ path }));
        }
        return populations.split(',').map(field => ({
            path: field,
        }));
    }

    private getProjection(projections): MongoProjections {
        if (!projections) {
            return '';
        }
        if (Array.isArray(projections)) {
            return projections.join(' ');
        }
        return projections.split(',').join(' ');
    }

    parseRequest(request: Request): MongooseParams {
        const { _page, _sort, _limit, _order, _show, _embed } = request.query as RequestQueryParams;

        const options = { page: _page, sort: _sort, limit: _limit, order: _order };
        const parsedOptions = this.getOptions(options);

        const populations = _embed;
        const parsedPopulations = this.getPopulations(populations);

        const projections = _show;
        const parsedProjections = this.getProjection(projections);

        return {
            options: parsedOptions,
            populations: parsedPopulations,
            projections: parsedProjections,
        };
    }

    validateRequest(request: Request): RequestValidationResponse {
        console.log(request);

        return RequestValidationResponse.createSuccessResponse();
    }
}
