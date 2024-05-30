import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('WakeUp Labs Challenge Restaurant Api')
        .setDescription('WakeUp Labs Challenge Restaurant Api')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    app.enableCors();
    console.log('Listening on port', process.env.PORT || 3000);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
