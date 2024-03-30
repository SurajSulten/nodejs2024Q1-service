import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import * as yamljs from 'yamljs'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document: OpenAPIObject = yamljs.load('./doc/api.yaml');
  SwaggerModule.setup('api', app, document)

  await app.listen(4000);
}
bootstrap();
