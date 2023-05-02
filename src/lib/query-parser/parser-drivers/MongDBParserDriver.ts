import { Request } from 'express';
import { QueryParserInterface, RequestQueryParams } from '../queryParserFactory.interface';
import { RequestValidationResponse } from '../validation/requestValidationResponse';
import { defaultValues } from './defaults';
import { MongoOptions, MongooseParams } from './MongoDB.interface';
export class MongoDBParserDriver implements QueryParserInterface<MongooseParams | RequestValidationResponse> {
    private getOptions({ limit, page, sort, order }): MongoOptions {
        const skip = parseInt(page ?? 0, 10) * parseInt(limit ?? defaultValues.pageSize, 10);
        const parsedLimit = parseInt(limit ?? defaultValues.pageSize, 10);
        const parsedOrder = parseInt(order ?? defaultValues.order, 10);
        const sortValue = sort ? { [sort]: parsedOrder } : undefined;

        return { skip, limit: parsedLimit, sort: sortValue };
    }

export class MongoDBParserDriver implements QueryParserInterface {
    parseRequest(request: Request): QueryParserResponse {
        const { page, orders, filters } = request.query;

    parseRequest(request: Request): MongooseParams {
        const { _page, _sort, _limit, _order, _show, _embed } = request.query as RequestQueryParams;

        const options = { page: _page, sort: _sort, limit: _limit, order: _order };
        const parsedOptions = this.getOptions(options);


        return {
            options: parsedOptions,

        };
    }

    validateRequest(request: Request): RequestValidationResponse {
        console.log(request);

        return RequestValidationResponse.createSuccessResponse();
    }
}
