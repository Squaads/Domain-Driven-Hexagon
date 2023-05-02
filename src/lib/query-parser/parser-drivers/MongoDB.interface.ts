import { MongoPopulations, MongoProjections } from './MongoDB.types';

export interface MongoOptions {
    skip?: number;
    limit?: number;
    sort?: { [key: string]: number };
}

export interface MongooseParams {
    options?: MongoOptions;
    populations?: MongoPopulations;
}
