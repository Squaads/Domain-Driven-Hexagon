import { ExampleModel } from '../../infrastructure/adapters/persistence/example.schema';
import { CreateExampleDto } from '../dto/createExampleDto';

export interface RepositoryPortCreateInterface {
    create(example: CreateExampleDto): Promise<ExampleModel>;
}
export interface RepositoryPortGetAllInterface {
    findAll(): Promise<ExampleModel[]>;
}
