import { Request } from 'express';
import { RequestValidationResponse } from './validation/requestValidationResponse';

export interface RequestQueryParams {
	_page?: string;
	_sort?: string;
	_limit?: string;
	_order?: string;
	_show?: string;
	_embed?: string;
}


export interface QueryParserInterface<T>{
    parseRequest(request: Request): T;

    validateRequest(request: Request): RequestValidationResponse;
}
