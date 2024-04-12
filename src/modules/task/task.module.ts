import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from '../../server/api/v1/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
