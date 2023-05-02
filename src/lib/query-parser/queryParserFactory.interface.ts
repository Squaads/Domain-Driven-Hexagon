import { Request } from 'express';
import { RequestValidationResponse } from './validation/requestValidationResponse';

import { QueryParserResponse } from './parse-response/queryParserResponse';

export interface QueryParserInterface<T>{
    parseRequest(request: Request): T;

    validateRequest(request: Request): RequestValidationResponse;
}
