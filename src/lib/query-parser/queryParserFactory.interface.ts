import { Request } from 'express';
import { RequestValidationResponse } from './validation/requestValidationResponse';
import { QueryParserResponse } from './parse-response/queryParserResponse';

export interface QueryParserInterface {
    parseRequest(request: Request): QueryParserResponse;

    validateRequest(request: Request): RequestValidationResponse;
}
