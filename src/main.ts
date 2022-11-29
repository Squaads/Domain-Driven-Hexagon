import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './lib/errors/http-exception.filter';
import { initializeSwaggerModule } from './modules/shared/infrastructure/adapters/swagger/initializeSwagger';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();

    if (process.env.MODE !== 'dev') {
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            tracesSampleRate: 1.0,
            environment: process.env.MODE,
            debug: false,
        });
    }

    if (process.env.MODE !== 'prod') {
        const options = new DocumentBuilder().build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('documentation', app, document);
        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(new HttpExceptionFilter());
        initializeSwaggerModule(app);
    } else {
        app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
        app.disable('x-powered-by');
    }

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
