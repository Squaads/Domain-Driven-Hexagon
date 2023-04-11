import { MongoDBParserDriver } from './parser-drivers/MongDBParserDriver';
import { QueryParserInterface } from './queryParser.interface';
import { QueryParserFactory } from './queryParserDriverFactory';

enum ParsingStrategy {
    mongoDB = 'mongoDB',
}

describe('Returns of Instances', () => {
    it('should return a MongoDBParserDriver instance', () => {
		const parserDriver: QueryParserInterface = QueryParserFactory(ParsingStrategy.mongoDB);
		expect(parserDriver).toBeInstanceOf(MongoDBParserDriver);
    });

});
