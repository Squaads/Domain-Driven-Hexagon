import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleModule } from './modules/example-domain/example.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            `${process.env.MONGO_PROTOCOL}${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@` +
                `${process.env.MONGO_CLUSTER}/${process.env.MODE}?retryWrites=true&w=majority`,
        ),
        ExampleModule,
    ],
    providers: [],
})
export class AppModule {}
