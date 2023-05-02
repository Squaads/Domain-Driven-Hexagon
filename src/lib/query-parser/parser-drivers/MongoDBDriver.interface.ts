import { MongoPopulations, MongoProjections } from './MongoDBDriver.types';

export interface MongoOptions {
    skip?: number;
    limit?: number;
    sort?: { [key: string]: number };
}

export interface MongooseParams {
    options?: MongoOptions;
    populations?: MongoPopulations;
    projections?: MongoProjections;
}
