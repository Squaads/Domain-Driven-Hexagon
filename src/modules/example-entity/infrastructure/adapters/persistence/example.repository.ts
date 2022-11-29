import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongoose } from '../../../../shared/infrastructure/persistence/baseMongoose.repository';
import { ExampleCollectionName, ExampleModel } from './example.schema';

@Injectable()
export class ExampleRepository extends BaseMongoose<ExampleModel> {
    constructor(@InjectModel(ExampleCollectionName) private exampleModel: Model<ExampleModel>) {
        super();
        this.model = this.exampleModel;
    }
}
