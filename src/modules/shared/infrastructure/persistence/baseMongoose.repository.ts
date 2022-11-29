import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
// import { QueryParserService } from '../../application/services/queryParser.service';
import { IBaseRepository } from './base.repository.interface';

/**
 * date: 09/11/2022
 * author: Melo Ortega
 * comment: We are going to comment out the QueryParserService because we are
 * not going to use it for now, but we will use it in the future. For sure. A
 * 100 percent.
 */

@Injectable()
export class BaseMongoose<T> implements IBaseRepository {
    public model: Model<T>;
    // private queryParserService: QueryParserService;

    // constructor() {
    //     this.queryParserService = new QueryParserService();
    // }

    async create(createDto: any): Promise<T> {
        const newEntity = await this.model.create(createDto);
        return newEntity;
    }

    async findAll(): Promise<T[]> {
        // const { filters, projections, populations, options } = this.queryParserService.getMongooseParams();
        // const entities =
        //     populations && populations.length !== 0
        //         ? await this.model
        //               .find(filters as any, projections, options)
        //               .populate(populations)
        //               .exec()
        //         : await this.model.find(filters as any, projections, options).exec();
        // return entities;
        const entities = await this.model.find().lean().exec();
        return entities as unknown as T[];
    }

    async update(id: string, updateDto: any): Promise<T> {
        const updatedEntity = this.model
            .findOneAndUpdate(
                {
                    id,
                } as any,
                updateDto,
                {
                    new: true,
                },
            )
            .lean()
            .exec();
        return updatedEntity as unknown as T;
    }

    async remove(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id).lean().exec() as unknown as T;
    }

    async findOne(id: string): Promise<T> {
        return this.model.findById(id).lean().exec() as unknown as T;
    }
}
