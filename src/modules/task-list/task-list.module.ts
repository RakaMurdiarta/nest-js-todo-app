import { Module } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskListController } from '../../server/api/v1/task-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskList } from 'src/entities';
import { TaskModule } from '../task/task.module';
import { TaskService } from '../task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, Task]), TaskModule],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
