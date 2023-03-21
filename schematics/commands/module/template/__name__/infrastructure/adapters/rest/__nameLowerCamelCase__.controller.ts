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
import { Create<%= nameUpperCamelCase %>Dto } from 'src/modules/<%= name %>/application/dto/create<%= nameUpperCamelCase %>Dto';
import {
    RestAdapterPortCreate<%= nameUpperCamelCase %>Interface,
    RestAdapterPortGetAll<%= nameUpperCamelCase %>sInterface,
} from 'src/modules/<%= name %>/application/ports/rest-adapter-port';
import { Create<%= nameUpperCamelCase %> } from 'src/modules/<%= name %>/application/use-cases/create<%= nameUpperCamelCase %>.usecase';
import { GetAll<%= nameUpperCamelCase %>s } from 'src/modules/<%= name %>/application/use-cases/getAll<%= nameUpperCamelCase %>s.usecase';
import { <%= nameUpperCamelCase %>ResponseDto } from '../../dto/<%= nameLowerCamelCase %>ResponseDto';

const DEFAULT_SERIALIZER_OPTIONS: ClassTransformOptions = {
    strategy: 'excludeAll',
};

@ApiTags('<%= name %>')
@UseInterceptors(SentryInterceptor)
@Controller('<%= name %>')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions(DEFAULT_SERIALIZER_OPTIONS)
export class <%= nameUpperCamelCase %>Controller {
    private create<%= nameUpperCamelCase %>UseCase: RestAdapterPortCreate<%= nameUpperCamelCase %>Interface;
    private getAll<%= nameUpperCamelCase %>sUseCase: RestAdapterPortGetAll<%= nameUpperCamelCase %>sInterface;

    constructor(create<%= nameUpperCamelCase %>UseCase: Create<%= nameUpperCamelCase %>, getAll<%= nameUpperCamelCase %>sUseCase: GetAll<%= nameUpperCamelCase %>s) {
        this.create<%= nameUpperCamelCase %>UseCase = create<%= nameUpperCamelCase %>UseCase;
        this.getAll<%= nameUpperCamelCase %>sUseCase = getAll<%= nameUpperCamelCase %>sUseCase;
    }

    @Get()
    async getAll<%= nameUpperCamelCase %>s(): Promise<<%= nameUpperCamelCase %>ResponseDto[]> {
        try {
            const <%= nameLowerCamelCase %>sCollection = await this.getAll<%= nameUpperCamelCase %>sUseCase.handler();
            return <%= nameLowerCamelCase %>sCollection.map(<%= nameLowerCamelCase %> => new <%= nameUpperCamelCase %>ResponseDto(<%= nameLowerCamelCase %>));
        } catch (error) {
            throw new Error(error.message);
        }
    }
    @Post()
    async create<%= nameUpperCamelCase %>(@Body() create<%= nameUpperCamelCase %>Dto: Create<%= nameUpperCamelCase %>Dto): Promise<void> {
        try {
            await this.create<%= nameUpperCamelCase %>UseCase.handler(create<%= nameUpperCamelCase %>Dto);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
