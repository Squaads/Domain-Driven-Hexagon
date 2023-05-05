import { MongoDBParserDriver } from './drivers/mongoDBDriver/mongoDBDriver';
import { ParsingStrategy, QueryParserFactory } from './queryParserFactory';

describe('Returns of Instances', () => {
    it('should return a MongoDBParserDriver instance', () => {
        const queryParser = new QueryParserFactory();
        queryParser.strategy = ParsingStrategy.MONGODB;
        const driver = queryParser.getDriver();
        expect(driver).toBeInstanceOf(MongoDBParserDriver);
    });
});
