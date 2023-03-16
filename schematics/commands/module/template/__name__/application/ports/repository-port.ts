import { <%= classify(name) %>Model } from '../../infrastructure/adapters/persistence/<%= name %>.schema';
import { Create<%= classify(name) %>Dto } from '../dto/create<%= nameFirstLetterToUpper %>Dto';

export interface RepositoryPortCreateInterface {
    create(<%= name %>: Create<%= classify(name) %>Dto): Promise<<%= classify(name) %>Model>;
}
export interface RepositoryPortGetAllInterface {
    findAll(): Promise<<%= classify(name) %>Model[]>;
}
