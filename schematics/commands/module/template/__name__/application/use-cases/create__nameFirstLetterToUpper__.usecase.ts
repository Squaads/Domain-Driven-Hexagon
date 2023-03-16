import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>Repository } from '../../infrastructure/adapters/persistence/<%= name %>.repository';
import { Create<%= classify(name) %>Dto } from '../dto/create<%= nameFirstLetterToUpper %>Dto';
import { RepositoryPortCreateInterface } from '../ports/repository-port';
import { RestAdapterPortCreate<%= classify(name) %>Interface } from '../ports/rest-adapter-port';

@Injectable()
export class Create<%= classify(name) %> implements RestAdapterPortCreate<%= classify(name) %>Interface {
    private <%= name %>Repository: RepositoryPortCreateInterface;
    constructor(<%= name %>Repository: <%= classify(name) %>Repository) {
        this.<%= name %>Repository = <%= name %>Repository;
    }

    async handler(<%= name %>: Create<%= classify(name) %>Dto): Promise<void> {
        try {
            await this.<%= name %>Repository.create(<%= name %>);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
