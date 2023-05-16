import { ArgumentsHost, Catch, ContextType, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter, ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): HttpException {
        const contextType = host.getType();
        if (contextType === 'ws' || contextType === 'rpc') return;
        if (contextType === 'http') {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();
            const status = exception.getStatus();
            response.status(status).json({
                statusCode: status,
                method: request.method,
                message: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
                ip: request.ip,
                userAgent: request.headers['user-agent'],
            });
        }
        const gqlHost = GqlArgumentsHost.create(host);
        const gqlContextType = gqlHost.getType() as ContextType | GqlContextType;
        if (gqlContextType === 'graphql') {
            return exception;
        }
    }
}
