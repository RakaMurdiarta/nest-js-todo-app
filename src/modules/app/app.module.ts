import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule as CustomConfigModule } from 'src/shared/config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from 'src/config/loads/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';
import { TaskModule } from '../task/task.module';
import { JsonWebTokenModule } from '../jwt/jwt.module';
import { JwtModule } from '@nestjs/jwt';
import { TaskListModule } from '../task-list/task-list.module';

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
    JwtModule.register({ global: true }),
    UserModule,
    RoleModule,
    TaskModule,
    TaskListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
