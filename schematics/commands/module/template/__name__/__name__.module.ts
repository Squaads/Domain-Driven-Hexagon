import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseMongoose } from '../shared/infrastructure/persistence/baseMongoose.repository';
import { Create<%= classify(name) %> } from './application/use-cases/create<%= nameFirstLetterToUpper %>.usecase';
import { GetAll<%= classify(name) %>s } from './application/use-cases/getAll<%= nameFirstLetterToUpper %>s.usecase';
import { <%= classify(name) %>Repository } from './infrastructure/adapters/persistence/<%=name %>.repository';
import { <%= classify(name) %>CollectionName, <%= classify(name) %>Schema } from './infrastructure/adapters/persistence/<%=name %>.schema';
import { <%= classify(name) %>Controller } from './infrastructure/adapters/rest/<%=name %>.controller';

const <%= name.toUpperCase() %>_USE_CASES_PROVIDERS = [Create<%= classify(name) %>, GetAll<%= classify(name) %>s];
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: <%= classify(name)%>CollectionName,
                schema: <%= classify(name)%>Schema,
                discriminators: [{ name: <%= classify(name) %>CollectionName, schema: <%= classify(name)%>Schema }],
            },
        ]),
    ],
    controllers: [<%= classify(name) %>Controller],
    providers: [<%= classify(name) %>Repository, BaseMongoose, ...<%= name.toUpperCase() %>_USE_CASES_PROVIDERS],
    exports: [<%= classify(name) %>Repository, BaseMongoose],
})
export class <%= classify(name) %>Module{}
