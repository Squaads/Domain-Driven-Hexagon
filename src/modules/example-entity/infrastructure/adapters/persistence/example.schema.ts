import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ExampleInterface } from '../../../domain/example.interface';

/**
 * date: 09/11/2022
 * author: Melo Ortega
 * comment: Incomplete imlementation, we need to add references to other schemas.
 * Schemas pending to be referenced:
 * - InvestmentRequests
 * - ProjectDocs
 * - ProjectTemplate
 * - ProjectFile
 */

@Schema({ timestamps: true })
export class ExampleModel implements ExampleInterface {
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

export type ExampleDocument = ExampleModel & Document;
export const ExampleSchema = SchemaFactory.createForClass(ExampleModel);
export const ExampleCollectionName = 'Example';
