import { Injectable } from '@nestjs/common';
import { <%= classify(name) %>Entity } from '../../domain/<%= name %>.entity';
import { <%= classify(name) %>Repository } from '../../infrastructure/adapters/persistence/<%= name %>.repository';
import { RepositoryPortGetAllInterface } from '../ports/repository-port';
import { RestAdapterPortGetAll<%= classify(name) %>sInterface } from '../ports/rest-adapter-port';

@Injectable()
export class GetAll<%= classify(name) %>s implements RestAdapterPortGetAll<%= classify(name) %>sInterface {
    private <%= name %>Repository: RepositoryPortGetAllInterface;
    constructor(<%= name %>Repository: <%= classify(name) %>Repository) {
        this.<%= name %>Repository = <%= name %>Repository;
    }

    async handler(): Promise<<%= classify(name) %>Entity[]> {
        try {
            const <%= name %>sCollection = await this.<%= name %>Repository.findAll();
            return <%= name %>sCollection.map(<%= name %> => new <%= classify(name) %>Entity(<%= name %>));
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
