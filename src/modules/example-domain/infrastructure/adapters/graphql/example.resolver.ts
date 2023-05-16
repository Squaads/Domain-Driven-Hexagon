import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateExampleDto } from 'src/modules/example-domain/application/dto/createExampleDto';
import { CreateExample } from 'src/modules/example-domain/application/use-cases/createExample.usecase';
import { GetAllExamples } from 'src/modules/example-domain/application/use-cases/getAllExamples.usecase';
import { ExampleResponseDto } from '../../dto/ExampleResponseDto';

@Resolver(() => ExampleResponseDto)
export class ExampleResolver {
    constructor(private getAllExamples: GetAllExamples, private createExample: CreateExample) {}

    @Query(() => [ExampleResponseDto])
    async examples(): Promise<ExampleResponseDto[]> {
        const examples = (await this.getAllExamples.handler()).map(example => new ExampleResponseDto(example));
        return examples;
    }

    @Mutation(() => ExampleResponseDto)
    async addExample(@Args('example') example: CreateExampleDto): Promise<ExampleResponseDto> {
        const created = await this.createExample.handler(example);
        return new ExampleResponseDto(created);
    }
}
