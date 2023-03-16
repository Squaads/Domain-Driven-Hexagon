import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseMongoose } from '../shared/infrastructure/persistence/baseMongoose.repository';

@Module({})
export class <%= classify(name) %>Module{}
