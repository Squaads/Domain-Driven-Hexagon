import { Injectable } from '@nestjs/common';
import { ExampleEntity } from '../../domain/example.entity';
import { ExampleRepository } from '../../infrastructure/adapters/persistence/example.repository';
import { CreateExampleDto } from '../dto/createExampleDto';
import { RepositoryPortCreateInterface } from '../ports/repository-port';
import { RestAdapterPortCreateExampleInterface } from '../ports/rest-adapter-port';

@Injectable()
export class CreateExample implements RestAdapterPortCreateExampleInterface {
    private exampleRepository: RepositoryPortCreateInterface;
    constructor(exampleRepository: ExampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    async handler(example: CreateExampleDto): Promise<ExampleEntity> {
        try {
            const response = await this.exampleRepository.create(example);
            return new ExampleEntity(response);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
