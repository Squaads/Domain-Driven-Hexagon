import { Request } from 'express';
import { QueryParserResponse } from '../parse-response/queryParserResponse';
import { RequestValidationResponse } from '../validation/requestValidationResponse';
import { QueryParserInterface } from '../queryParserFactory.interface';

export class MongoDBParserDriver implements QueryParserInterface {
    parseRequest(request: Request): QueryParserResponse {
        const { page, orders, filters } = request.query;

        console.log(page, orders, filters);

        return {
            filters: [],
            orders: [],
            pagination: {
                currentPage: 0,
                totalPages: 0,
                items: [],
                lastPage: 0,
            },
        };
    }

    validateRequest(request: Request): RequestValidationResponse {
        console.log(request);

        return RequestValidationResponse.createSuccessResponse();
    }
}
