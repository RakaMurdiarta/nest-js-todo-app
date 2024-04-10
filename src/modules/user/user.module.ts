import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from 'src/server/api/v1/user.controller';
import { ConfigModule } from 'src/shared/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from 'src/entities';
import { RoleService } from '../role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, RoleService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
