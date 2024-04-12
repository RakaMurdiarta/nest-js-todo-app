import { Injectable } from '@nestjs/common';
import { CreateTaskListDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from 'src/entities';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepo: Repository<TaskList>,
    private readonly manager: EntityManager,
  ) {}
  async create(createTaskListDto: CreateTaskListDto): Promise<void> {
    const taskListData = this.manager.create(TaskList, {
      body: createTaskListDto.body,
      status: createTaskListDto.status,
      task: {
        id: createTaskListDto.taskId,
      },
    });

    await this.manager.save(taskListData);
  }

  async getAllTaskListByTaskId(taskId: string): Promise<TaskList[]> {
    return this.taskListRepo.find({
      where: {
        task: {
          id: taskId,
        },
      },
      relations: {
        task: true,
      },
      select: {
        id: true,
        body: true,
        status: true,
        task: {
          id: true,
          title: true,
          createdDate: true,
        },
      },
    });
  }
}
