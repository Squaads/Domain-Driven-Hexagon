import { <%= classify(name) %>Entity } from '../../domain/<%= name %>.entity';
import { Create<%= classify(name) %>Dto } from '../dto/create<%= nameFirstLetterToUpper %>Dto';

export interface RestAdapterPortCreate<%= classify(name) %>Interface {
    handler(<%= name %>: Create<%= classify(name) %>Dto): Promise<void>;
}

export interface RestAdapterPortGetAll<%= classify(name) %>sInterface {
    handler(): Promise<<%= classify(name) %>Entity[]>;
}
