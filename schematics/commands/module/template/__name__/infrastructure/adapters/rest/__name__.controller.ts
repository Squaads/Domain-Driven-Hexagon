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
import { Create<%= classify(name) %>Dto } from 'src/modules/<%= name %>/application/dto/create<%= nameFirstLetterToUpper %>Dto';
import {
    RestAdapterPortCreate<%= classify(name) %>Interface,
    RestAdapterPortGetAll<%= classify(name) %>sInterface,
} from 'src/modules/<%= name %>/application/ports/rest-adapter-port';
import { Create<%= classify(name) %> } from 'src/modules/<%= name %>/application/use-cases/create<%= nameFirstLetterToUpper %>.usecase';
import { GetAll<%= classify(name) %>s } from 'src/modules/<%= name %>/application/use-cases/getAll<%= nameFirstLetterToUpper %>s.usecase';
import { <%= classify(name) %>ResponseDto } from '../../dto/<%= nameFirstLetterToUpper %>ResponseDto';

const DEFAULT_SERIALIZER_OPTIONS: ClassTransformOptions = {
    strategy: 'excludeAll',
};

@ApiTags('<%= name %>')
@UseInterceptors(SentryInterceptor)
@Controller('<%= name %>')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions(DEFAULT_SERIALIZER_OPTIONS)
export class <%= classify(name) %>Controller {
    private create<%= classify(name) %>UseCase: RestAdapterPortCreate<%= classify(name) %>Interface;
    private getAll<%= classify(name) %>sUseCase: RestAdapterPortGetAll<%= classify(name) %>sInterface;

    constructor(create<%= classify(name) %>UseCase: Create<%= classify(name) %>, getAll<%= classify(name) %>sUseCase: GetAll<%= classify(name) %>s) {
        this.create<%= classify(name) %>UseCase = create<%= classify(name) %>UseCase;
        this.getAll<%= classify(name) %>sUseCase = getAll<%= classify(name) %>sUseCase;
    }

    @Get()
    async getAll<%= classify(name) %>s(): Promise<<%= classify(name) %>ResponseDto[]> {
        try {
            const <%= name %>sCollection = await this.getAll<%= classify(name) %>sUseCase.handler();
            return <%= name %>sCollection.map(<%= name %> => new <%= classify(name) %>ResponseDto(<%= name %>));
        } catch (error) {
            throw new Error(error.message);
        }
    }
    @Post()
    async create<%= classify(name) %>(@Body() create<%= classify(name) %>Dto: Create<%= classify(name) %>Dto): Promise<void> {
        try {
            await this.create<%= classify(name) %>UseCase.handler(create<%= classify(name) %>Dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
