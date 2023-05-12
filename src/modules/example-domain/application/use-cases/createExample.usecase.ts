import { Injectable } from '@nestjs/common';
import { mongooseTransactionSessionCreator } from
    'src/modules/shared/infrastructure/persistence/mongooseTransactionSessionCreator';
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
        const session = await mongooseTransactionSessionCreator();

        (this.exampleRepository as ExampleRepository).setTransactionSession(session);

        try {
            await this.exampleRepository.create(example);

            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();

            throw new Error(error.message);
        }
        finally {
            session.endSession();
        }
    }
}
