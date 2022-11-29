import { SwaggerModule as SwaggerModuleMocked } from '@nestjs/swagger';
import { initializeSwaggerModule } from './initializeSwagger';

jest.mock('@nestjs/swagger', () => ({
    ...(jest.requireActual('@nestjs/swagger') as any),
    SwaggerModule: {
        createDocument: jest.fn(),
        setup: jest.fn(),
    },
}));

afterAll(jest.clearAllMocks);

describe('initializeSwaggerModule', () => {
    it('calls SwaggerModule methods with the correct params', () => {
        const appMocked: any = '::appMocked::';
        initializeSwaggerModule(appMocked);
        expect(SwaggerModuleMocked.createDocument).toBeCalledTimes(1);
        expect(SwaggerModuleMocked.setup).toBeCalledTimes(1);
    });
});
