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
import { CreateExample } from 'src/modules/example-entity/application/use-cases/createExample.usecase';
import { GetAllExamples } from 'src/modules/example-entity/application/use-cases/getAllExamples.usecase';
import { CreateExampleDto } from 'src/modules/example-entity/application/dto/createExampleDto';
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
    constructor(
        private createExampleUseCase: CreateExample,
        private getAllExamplesUseCase: GetAllExamples,
    ) {}

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
