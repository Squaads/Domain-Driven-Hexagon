import { <%= nameUpperCamelCase %>Model } from '../../infrastructure/adapters/persistence/<%= nameLowerCamelCase %>.schema';
import { Create<%= nameUpperCamelCase %>Dto } from '../dto/create<%= nameUpperCamelCase %>Dto';

export interface RepositoryPortCreateInterface {
    create(<%= nameLowerCamelCase %>: Create<%= nameUpperCamelCase %>Dto): Promise<<%= nameUpperCamelCase %>Model>;
}
export interface RepositoryPortGetAllInterface {
    findAll(): Promise<<%= nameUpperCamelCase %>Model[]>;
}
