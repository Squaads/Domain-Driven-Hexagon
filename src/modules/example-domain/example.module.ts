import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseMongoose } from '../shared/infrastructure/persistence/baseMongoose.repository';
import { CreateExample } from './application/use-cases/createExample.usecase';
import { GetAllExamples } from './application/use-cases/getAllExamples.usecase';
import { ExampleRepository } from './infrastructure/adapters/persistence/example.repository';
import { ExampleCollectionName, ExampleSchema } from './infrastructure/adapters/persistence/example.schema';
import { ExampleController } from './infrastructure/adapters/rest/example.controller';

const EXAMPLE_USE_CASES_PROVIDERS = [CreateExample, GetAllExamples];
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ExampleCollectionName,
                schema: ExampleSchema,
                discriminators: [{ name: ExampleCollectionName, schema: ExampleSchema }],
            },
        ]),
    ],
    controllers: [ExampleController],
    providers: [ExampleRepository, BaseMongoose, ...EXAMPLE_USE_CASES_PROVIDERS],
    exports: [ExampleRepository, BaseMongoose],
})
export class ExampleModule {}
