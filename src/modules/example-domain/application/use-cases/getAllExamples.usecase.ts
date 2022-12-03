import { Injectable } from '@nestjs/common';
import { ExampleEntity } from '../../domain/example.entity';
import { ExampleRepository } from '../../infrastructure/adapters/persistence/example.repository';
import { RepositoryPortGetAllInterface } from '../ports/repository-port';
import { RestAdapterPortGetAllExamplesInterface } from '../ports/rest-adapter-port';

@Injectable()
export class GetAllExamples implements RestAdapterPortGetAllExamplesInterface {
    private exampleRepository: RepositoryPortGetAllInterface;
    constructor(exampleRepository: ExampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    async handler(): Promise<ExampleEntity[]> {
        try {
            const examplesCollection = await this.exampleRepository.findAll();
            return examplesCollection.map(example => new ExampleEntity(example));
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
