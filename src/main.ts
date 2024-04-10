import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { loadYamlFile } from './utils/read.yaml';
import { IConfig } from './config/interface/config.interface';
import { HttpExceptionFilter } from './exception/catch-global-error';
import { iniSwagger } from './swagger/setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  /** load config file */
  const configFile = loadYamlFile<IConfig>('config');
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  iniSwagger(app);
  await app.listen(configFile.app.port ?? 8080);
}
bootstrap();
