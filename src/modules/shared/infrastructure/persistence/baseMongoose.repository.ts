import { Transform } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { ClientSession, Model } from 'mongoose';
// import { QueryParserService } from '../../application/services/queryParser.service';
import { IBaseRepository } from '../../domain/base.repository.interface';

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

    protected transactionSession: ClientSession | null = null;

    // private queryParserService: QueryParserService;

    // constructor() {
    //     this.queryParserService = new QueryParserService();
    // }

    async create(createDto: any): Promise<T> {
        let newEntity;

        if (this.transactionSession) {
            newEntity = (await this.model.create(createDto, { session: this.transactionSession }));
        }
        else {
            newEntity = await this.model.create(createDto);
        }

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

        let results;

        if (this.transactionSession) {
            results = await this.model.find().session(this.transactionSession);
        }
        else {
            results = await this.model.find();
        }

        const entities = results.lean().exec();

        return entities as unknown as T[];
    }

    async update(id: string, updateDto: any): Promise<T> {
        let updatedEntity;

        const filter = {
            _id: id,
        } as any;

        const options = {
            new: true,
        };

        if (this.transactionSession) {
            const optionsIncludingTransactionParam = { ...options, session: this.transactionSession };

            updatedEntity = this.model
            .findOneAndUpdate(
                filter,
                updateDto,
                optionsIncludingTransactionParam,
            );
        }
        else {
            updatedEntity = this.model
            .findOneAndUpdate(
                filter,
                updateDto,
                options,
            );
        }

        updatedEntity.lean().exec();

        return updatedEntity as unknown as T;
    }

    async remove(id: string): Promise<T> {
        let modelToDelete;

        if (this.transactionSession) {
            modelToDelete = this.model.findByIdAndDelete(id).session(this.transactionSession);
        }
        else {
            modelToDelete = this.model.findByIdAndDelete(id);
        }

        return modelToDelete.lean().exec() as unknown as T;
    }

    async findOne(id: string): Promise<T> {
        let foundModel;

        if (this.transactionSession) {
            foundModel = this.model.findById(id).session(this.transactionSession);
        }
        else {
            foundModel = this.model.findById(id);
        }

        return foundModel.lean().exec() as unknown as T;
    }

    public setTransactionSession(session: ClientSession): void {
        this.transactionSession = session;
    }
}
