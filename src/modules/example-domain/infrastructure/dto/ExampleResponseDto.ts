import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { ExampleEntity } from '../../domain/example.entity';

export class ExampleResponseDto extends ExampleEntity {
    private _id: ObjectId;
    @Expose()
    get id(): string {
        return this._id.toString();
    }
    @Expose()
    title: string;
    @Expose()
    stars: number;
    @Expose()
    location: string;
    @Expose()
    rooms: number;
    @Expose()
    description: string;
    @Expose()
    startDate: Date;
    @Expose()
    endDate: Date;
    @Expose()
    operator: string;
    @Expose()
    company: string;
    @Expose()
    projectImages: string[];
    @Expose()
    isPublished: boolean;
    @Expose()
    @Transform(({ value }) => Number(value.toString()))
    minimumInvest: number;
    @Expose()
    @Transform(({ value }) => Number(value.toString()))
    projectCost: number;
    @Expose()
    @Transform(({ value }) => Number(value.toString()))
    totalInvest: number;
}