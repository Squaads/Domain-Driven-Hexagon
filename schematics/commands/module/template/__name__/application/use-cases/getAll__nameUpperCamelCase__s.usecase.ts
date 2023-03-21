import { Injectable } from '@nestjs/common';
import { <%= nameUpperCamelCase %>Entity } from '../../domain/<%= nameLowerCamelCase %>.entity';
import { <%= nameUpperCamelCase %>Repository } from '../../infrastructure/adapters/persistence/<%= nameLowerCamelCase %>.repository';
import { RepositoryPortGetAllInterface } from '../ports/repository-port';
import { RestAdapterPortGetAll<%= nameUpperCamelCase %>sInterface } from '../ports/rest-adapter-port';

@Injectable()
export class GetAll<%= nameUpperCamelCase %>s implements RestAdapterPortGetAll<%= nameUpperCamelCase %>sInterface {
    private <%= nameLowerCamelCase %>Repository: RepositoryPortGetAllInterface;
    constructor(<%= nameLowerCamelCase %>Repository: <%= nameUpperCamelCase %>Repository) {
        this.<%= nameLowerCamelCase %>Repository = <%= nameLowerCamelCase %>Repository;
    }

    async handler(): Promise<<%= nameUpperCamelCase %>Entity[]> {
        try {
            const <%= nameLowerCamelCase %>sCollection = await this.<%= nameLowerCamelCase %>Repository.findAll();
            return <%= nameLowerCamelCase %>sCollection.map(<%= nameLowerCamelCase %> => new <%= nameUpperCamelCase %>Entity(<%= nameLowerCamelCase %>));
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
