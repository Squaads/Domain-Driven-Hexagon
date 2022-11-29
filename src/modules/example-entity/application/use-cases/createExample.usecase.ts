import { Injectable } from '@nestjs/common';
import { ExampleRepository } from '../../infrastructure/adapters/persistence/example.repository';
import { CreateExampleDto } from '../dto/createExampleDto';

@Injectable()
export class CreateExample {
    constructor(private exampleRepository: ExampleRepository) {}

    async handler(example: CreateExampleDto): Promise<void> {
        try {
            await this.exampleRepository.create(example);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
