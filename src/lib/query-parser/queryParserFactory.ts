import { Injectable } from '@nestjs/common';
import { QueryParserInterface } from './queryParserFactory.interface';
import { MongoDBParserDriver } from './drivers/mongoDBDriver/mongoDBDriver';

export enum ParsingStrategy {
    MONGODB = 'mongoDB',
}

@Injectable()
export class QueryParserFactory {
    strategy: ParsingStrategy;

    getDriver(): QueryParserInterface<unknown> {
        switch (this.strategy) {
            case ParsingStrategy.MONGODB:
                return new MongoDBParserDriver();
            default:
                throw new Error('Driver not found');
        }
    }
}
