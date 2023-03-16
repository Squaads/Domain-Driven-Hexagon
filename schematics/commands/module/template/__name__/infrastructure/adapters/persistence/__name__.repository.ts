import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryPortCreateInterface } from 'src/modules/<%= name %>/application/ports/repository-port';
import { BaseMongoose } from '../../../../shared/infrastructure/persistence/baseMongoose.repository';
import { <%= classify(name) %>CollectionName, <%= classify(name) %>Model } from './<%= name %>.schema';

@Injectable()
export class <%= classify(name) %>Repository
    extends BaseMongoose<<%= classify(name) %>Model>
    implements RepositoryPortCreateInterface, RepositoryPortCreateInterface
{
    constructor(@InjectModel(<%= classify(name) %>CollectionName) private <%= name %>Model: Model<<%= classify(name) %>Model>) {
        super();
        this.model = this.<%= name %>Model;
    }
}
