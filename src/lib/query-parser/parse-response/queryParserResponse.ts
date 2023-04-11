export type QueryOrder = {
    order: 'ASC' | 'DESC'
};

export type PaginationData = {
    currentPage: number;
    totalPages: number;
    lastPage: number;
    items: any[];
};

export interface QueryParserResponse {
    filters: Record<string, any>[];
    orders: Record<string, QueryOrder>[];
    pagination: PaginationData;
}
