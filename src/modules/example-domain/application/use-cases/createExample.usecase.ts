import { Injectable } from '@nestjs/common';
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

    async handler(example: CreateExampleDto): Promise<void> {
        try {
            await this.exampleRepository.create(example);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
