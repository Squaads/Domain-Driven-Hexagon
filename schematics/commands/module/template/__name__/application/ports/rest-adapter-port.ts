import { <%= nameUpperCamelCase %>Entity } from '../../domain/<%= nameLowerCamelCase %>.entity';
import { Create<%= nameUpperCamelCase %>Dto } from '../dto/create<%= nameUpperCamelCase %>Dto';

export interface RestAdapterPortCreate<%= nameUpperCamelCase %>Interface {
    handler(<%= nameLowerCamelCase %>: Create<%= nameUpperCamelCase %>Dto): Promise<void>;
}

export interface RestAdapterPortGetAll<%= nameUpperCamelCase %>sInterface {
    handler(): Promise<<%= nameUpperCamelCase %>Entity[]>;
}
