import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
    const logger = new Logger('Application');

    const PORT = process.env.PORT ?? 3000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Url Shortener API')
        .setVersion('1.0.0')
        .addTag('url-shortener')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.setGlobalPrefix('api', {
        exclude: [{ path: 'l/:shortCode', method: RequestMethod.GET }],
    });

    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );

    await app.listen(PORT);
    logger.log(`Listening port ${PORT}`);
}
bootstrap();
