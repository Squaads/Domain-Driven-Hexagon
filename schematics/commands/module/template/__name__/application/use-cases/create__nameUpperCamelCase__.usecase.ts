import { Injectable } from '@nestjs/common';
import { <%= nameUpperCamelCase %>Repository } from '../../infrastructure/adapters/persistence/<%= nameLowerCamelCase %>.repository';
import { Create<%= nameUpperCamelCase %>Dto } from '../dto/create<%= nameUpperCamelCase %>Dto';
import { RepositoryPortCreateInterface } from '../ports/repository-port';
import { RestAdapterPortCreate<%= nameUpperCamelCase %>Interface } from '../ports/rest-adapter-port';

@Injectable()
export class Create<%= nameUpperCamelCase %> implements RestAdapterPortCreate<%= nameUpperCamelCase %>Interface {
    private <%= nameLowerCamelCase %>Repository: RepositoryPortCreateInterface;
    constructor(<%= nameLowerCamelCase %>Repository: <%= nameUpperCamelCase %>Repository) {
        this.<%= nameLowerCamelCase %>Repository = <%= nameLowerCamelCase %>Repository;
    }

    async handler(<%= nameLowerCamelCase %>: Create<%= nameUpperCamelCase %>Dto): Promise<void> {
        try {
            await this.<%= nameLowerCamelCase %>Repository.create(<%= nameLowerCamelCase %>);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
