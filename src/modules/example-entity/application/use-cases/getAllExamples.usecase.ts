import { Injectable } from '@nestjs/common';
import { ExampleEntity } from '../../domain/example.entity';
import { ExampleRepository } from '../../infrastructure/adapters/persistence/example.repository';

@Injectable()
export class GetAllExamples {
    constructor(private exampleRepository: ExampleRepository) {}

    async handler(): Promise<ExampleEntity[]> {
        try {
            const examplesCollection = await this.exampleRepository.findAll();
            return examplesCollection.map(example => new ExampleEntity(example));
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
