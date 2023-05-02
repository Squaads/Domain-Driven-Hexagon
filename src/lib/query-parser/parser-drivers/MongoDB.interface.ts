export interface MongoOptions {
    skip?: number;
    limit?: number;
    sort?: { [key: string]: number };
}

export interface MongooseParams {
    options?: MongoOptions;
}
