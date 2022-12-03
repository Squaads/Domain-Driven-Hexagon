import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    SerializeOptions,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassTransformOptions } from 'class-transformer';
import { SentryInterceptor } from 'src/lib/errors/sentry.interceptor';
import { CreateExampleDto } from 'src/modules/example-domain/application/dto/createExampleDto';
import {
    RestAdapterPortCreateExampleInterface,
    RestAdapterPortGetAllExamplesInterface,
} from 'src/modules/example-domain/application/ports/rest-adapter-port';
import { CreateExample } from 'src/modules/example-domain/application/use-cases/createExample.usecase';
import { GetAllExamples } from 'src/modules/example-domain/application/use-cases/getAllExamples.usecase';
import { ExampleResponseDto } from '../../dto/ExampleResponseDto';

const DEFAULT_SERIALIZER_OPTIONS: ClassTransformOptions = {
    strategy: 'excludeAll',
};

@ApiTags('example')
@UseInterceptors(SentryInterceptor)
@Controller('example')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions(DEFAULT_SERIALIZER_OPTIONS)
export class ExampleController {
    private createExampleUseCase: RestAdapterPortCreateExampleInterface;
    private getAllExamplesUseCase: RestAdapterPortGetAllExamplesInterface;

    constructor(createExampleUseCase: CreateExample, getAllExamplesUseCase: GetAllExamples) {
        this.createExampleUseCase = createExampleUseCase;
        this.getAllExamplesUseCase = getAllExamplesUseCase;
    }

    @Get()
    async getAllExamples(): Promise<ExampleResponseDto[]> {
        try {
            const examplesCollection = await this.getAllExamplesUseCase.handler();
            return examplesCollection.map(example => new ExampleResponseDto(example));
        } catch (error) {
            throw new Error(error.message);
        }
    }
    @Post()
    async createExample(@Body() createExampleDto: CreateExampleDto): Promise<void> {
        try {
            await this.createExampleUseCase.handler(createExampleDto);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
