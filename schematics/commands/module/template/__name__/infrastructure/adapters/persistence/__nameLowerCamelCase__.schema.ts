import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { <%= nameUpperCamelCase %>Interface } from '../../../domain/<%= nameLowerCamelCase %>.interface';

@Schema({ timestamps: true })
export class <%= nameUpperCamelCase %>Model implements <%= nameUpperCamelCase %>Interface {
    @Prop({
        required: true,
        maxlength: 20,
    })
    title: string;

    @Prop({
        required: true,
        maxlength: 500,
    })
    description: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.Date,
    })
    startDate;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.Date,
    })
    endDate;

    @Prop({
        required: true,
        maxlength: 20,
    })
    location: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.Decimal128,
    })
    minimumInvest;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.Decimal128,
    })
    projectCost;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.Decimal128,
    })
    totalInvest;

    @Prop({
        required: true,
        maxlength: 20,
    })
    operator: string;

    @Prop({
        required: true,
        maxlength: 20,
    })
    company: string;

    @Prop({
        required: true,
        maxlength: 5,
        type: [String],
    })
    projectImages: string[];

    @Prop({
        required: true,
        type: Boolean,
    })
    isPublished: boolean;
}

export type <%= nameUpperCamelCase %>Document = <%= nameUpperCamelCase %>Model & Document;
export const <%= nameUpperCamelCase %>Schema = SchemaFactory.createForClass(<%= nameUpperCamelCase %>Model);
export const <%= nameUpperCamelCase %>CollectionName = '<%= nameUpperCamelCase %>';
