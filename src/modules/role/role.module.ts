import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from '../../server/api/v1/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
