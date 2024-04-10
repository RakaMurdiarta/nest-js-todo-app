import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static register(path: { folder: string }): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG',
          useValue: path,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
