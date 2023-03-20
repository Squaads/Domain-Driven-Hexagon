import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryPortCreateInterface } from 'src/modules/<%= name %>/application/ports/repository-port';
import { BaseMongoose } from '../../../../shared/infrastructure/persistence/baseMongoose.repository';
import { <%= nameUpperCamelCase %>CollectionName, <%= nameUpperCamelCase %>Model } from './<%= nameLowerCamelCase %>.schema';

@Injectable()
export class <%= nameUpperCamelCase %>Repository
    extends BaseMongoose<<%= nameUpperCamelCase %>Model>
    implements RepositoryPortCreateInterface, RepositoryPortCreateInterface
{
    constructor(@InjectModel(<%= nameUpperCamelCase %>CollectionName) private <%= nameLowerCamelCase %>Model: Model<<%= nameUpperCamelCase %>Model>) {
        super();
        this.model = this.<%= nameLowerCamelCase %>Model;
    }
}
