import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseMongoose } from '../shared/infrastructure/persistence/baseMongoose.repository';
import { Create<%= nameUpperCamelCase %> } from './application/use-cases/create<%= nameUpperCamelCase %>.usecase';
import { GetAll<%= nameUpperCamelCase %>s } from './application/use-cases/getAll<%= nameUpperCamelCase %>s.usecase';
import { <%= nameUpperCamelCase %>Repository } from './infrastructure/adapters/persistence/<%= nameLowerCamelCase %>.repository';
import { <%= nameUpperCamelCase %>CollectionName, <%= nameUpperCamelCase %>Schema } from './infrastructure/adapters/persistence/<%= nameLowerCamelCase %>.schema';
import { <%= nameUpperCamelCase %>Controller } from './infrastructure/adapters/rest/<%= nameLowerCamelCase %>.controller';

const <%= nameSnakeCase.toUpperCase() %>_USE_CASES_PROVIDERS = [Create<%= nameUpperCamelCase %>, GetAll<%= nameUpperCamelCase %>s];
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: <%= nameUpperCamelCase%>CollectionName,
                schema: <%= nameUpperCamelCase%>Schema,
                discriminators: [{ name: <%= nameUpperCamelCase %>CollectionName, schema: <%= nameUpperCamelCase%>Schema }],
            },
        ]),
    ],
    controllers: [<%= nameUpperCamelCase %>Controller],
    providers: [<%= nameUpperCamelCase %>Repository, BaseMongoose, ...<%= nameSnakeCase.toUpperCase() %>_USE_CASES_PROVIDERS],
    exports: [<%= nameUpperCamelCase %>Repository, BaseMongoose],
})
export class <%= nameUpperCamelCase %>Module{}
