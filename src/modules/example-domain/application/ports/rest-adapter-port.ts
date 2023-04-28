import { ExampleEntity } from '../../domain/example.entity';
import { CreateExampleDto } from '../dto/createExampleDto';

export interface RestAdapterPortCreateExampleInterface {
    handler(example: CreateExampleDto): Promise<ExampleEntity>;
}

export interface RestAdapterPortGetAllExamplesInterface {
    handler(): Promise<ExampleEntity[]>;
}
