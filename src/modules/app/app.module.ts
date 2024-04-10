import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule as CustomConfigModule } from 'src/shared/config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from 'src/config/loads/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('database'),
        };
      },
      inject: [ConfigService],
    }),
    CustomConfigModule.register({ folder: 'config' }),
    UserModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
