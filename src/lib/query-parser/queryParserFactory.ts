import { Injectable } from '@nestjs/common';
import { MongoDBParserDriver } from './parser-drivers/MongDBParserDriver';
import { QueryParserInterface } from './queryParserFactory.interface';

export enum ParsingStrategy {
    MONGODB = 'mongoDB',
}

@Injectable()
export class QueryParserFactory {
    strategy: ParsingStrategy;

    getDriver(): QueryParserInterface {
        switch (this.strategy) {
            case ParsingStrategy.MONGODB:
                return new MongoDBParserDriver();
            default:
                throw new Error('Driver not found');
        }
    }
}
