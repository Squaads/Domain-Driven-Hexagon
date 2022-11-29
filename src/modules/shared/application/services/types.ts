export interface UrlQuery extends BaseQuery {
    [key: string]: unknown;
}
interface BaseQuery {
    _page?: string;
    _sort?: string;
    _limit?: string;
    _order?: string;
    _show?: string | string[];
    _embed?: string | string[];
}
