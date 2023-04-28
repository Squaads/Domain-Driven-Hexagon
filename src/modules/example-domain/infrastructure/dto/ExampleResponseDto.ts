import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import { GraphQLString } from 'graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class ExampleResponseDto {
    constructor(object: any) {
        Object.assign(this, object);
    }

    private _id: ObjectId;

    @Field()
    @Expose()
    get id(): string {
        return this._id.toString();
    }

    @Field()
    @Expose()
    title: string;

    @Field()
    @Expose()
    stars: number;

    @Field()
    @Expose()
    location: string;

    @Field()
    @Expose()
    rooms: number;

    @Field()
    @Expose()
    description: string;

    @Field()
    @Expose()
    startDate: Date;

    @Field()
    @Expose()
    endDate: Date;

    @Field()
    @Expose()
    operator: string;

    @Field()
    @Expose()
    company: string;

    @Field(() => [GraphQLString])
    @Expose()
    projectImages: string[];

    @Field()
    @Expose()
    isPublished: boolean;

    @Expose()
    @Transform(({ value }) => Number(value.toString()))
    @Field()
    minimumInvest: number;

    @Expose()
    @Field(() => Float)
    projectCost: number;

    @Expose()
    @Transform(({ value }) => Number(value.toString()))
    @Field()
    totalInvest: number;
}
