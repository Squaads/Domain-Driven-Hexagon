import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryPortCreateInterface } from 'src/modules/example-domain/application/ports/repository-port';
import { MongooseBaseRepository } from 'src/modules/shared/infrastructure/adapters/persistence/mongoose-repository/mongoose.repository';
import { ExampleCollectionName, ExampleModel } from './example.schema';

@Injectable()
export class ExampleRepository
    extends MongooseBaseRepository<ExampleModel>
    implements RepositoryPortCreateInterface, RepositoryPortCreateInterface
{
    constructor(@InjectModel(ExampleCollectionName) exampleModel: Model<ExampleModel>) {
        super();
        this.model = exampleModel;
    }
}
