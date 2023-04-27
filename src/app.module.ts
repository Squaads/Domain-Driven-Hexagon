import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleModule } from './modules/example-domain/example.module';
import { FirebaseService } from './modules/shared/application/services/firebase.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: process.env.MODE === 'dev',
            autoSchemaFile: true,
            includeStacktraceInErrorResponses: process.env.MODE === 'dev',
        }),
        MongooseModule.forRoot(
            `${process.env.MONGO_PROTOCOL}${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@` +
                `${process.env.MONGO_CLUSTER}/${process.env.MODE}?retryWrites=true&w=majority`,
        ),
        ExampleModule,
    ],
    providers: [FirebaseService],
})
export class AppModule {}
