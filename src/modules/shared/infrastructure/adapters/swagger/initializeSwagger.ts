import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initializeSwaggerModule = (nestApp: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle('Squaads Domain Driven Hexagon API')
        .setDescription('Api documentation to use Squaads nest template data on your apps')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('api', nestApp, document);
};
