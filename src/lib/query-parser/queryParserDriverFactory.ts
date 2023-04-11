import { QueryParserInterface } from './queryParser.interface';
import { MongoDBParserDriver } from './parser-drivers/MongDBParserDriver';

enum ParsingStrategy {
    mongoDB = 'mongoDB',
}

export const QueryParserFactory = (strategy: ParsingStrategy): QueryParserInterface => {
    switch (strategy) {
        case 'mongoDB':
            return new MongoDBParserDriver();
        default:
            throw new Error('No query parser driver found');
    }
};
