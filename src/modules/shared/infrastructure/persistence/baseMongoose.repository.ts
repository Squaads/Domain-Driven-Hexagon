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

/**
 * date: 12/05/2023
 * author: David Medina
 * comment: deleted QueryParserService now we are using the queryParserFactory from the lib
 */

@Injectable()
export class BaseMongoose<T> implements IBaseRepository {
    public model: Model<T>;

    async create(createDto: any): Promise<T> {
        const newEntity = await this.model.create(createDto);
        return newEntity;
    }

    async findAll(queryParsed): Promise<T[]> {
        const { options, populations, projections, filters } = queryParsed;
        let queryBuilder = this.model.find();

        if (options) {
            const { limit, skip, sort } = options;
            queryBuilder = queryBuilder.limit(limit).skip(skip).sort(sort);
        }

        if (populations) {
            queryBuilder = queryBuilder.populate(populations) as any;
        }

        if (projections) {
            queryBuilder = queryBuilder.select(projections);
        }

        if (filters) {
            queryBuilder = queryBuilder.where(filters);
        }

        const entities = await queryBuilder.lean().exec();
        return entities as unknown as T[];
    }

    async update(id: string, updateDto: any): Promise<T> {
        const updatedEntity = this.model
            .findOneAndUpdate(
                {
                    _id: id,
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
