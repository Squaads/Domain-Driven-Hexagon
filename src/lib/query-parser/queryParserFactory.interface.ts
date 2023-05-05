import { Request } from 'express';

export interface RequestQueryParams {
    _page?: string;
    _sort?: string;
    _limit?: string;
    _order?: string;
    _show?: string;
    _embed?: string;
    _filters?: { [key: string]: string };
}

export interface QueryParserInterface<T> {
    parseRequest(request: Request): T;
}
