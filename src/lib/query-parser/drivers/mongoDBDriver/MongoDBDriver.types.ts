export type MongoProjections = string;
export type MongoPopulations = string[] | Record<string, string>[];
export type MongoFilters = { $and?: Record<string, unknown>[] };
export type MongoFiltersArray = Record<string, unknown>[];
export type MongoFiltersQuery = Record<string, unknown>;
