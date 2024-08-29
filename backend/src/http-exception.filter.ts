import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException, BadRequestException, Error)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: Error | HttpException | BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response
            .json({
                message: exception.message,
                success: false,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}