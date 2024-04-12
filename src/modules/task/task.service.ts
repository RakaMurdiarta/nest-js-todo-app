import { Injectable, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/request.dto';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(payload: CreateTaskDto, userId: string): Promise<void> {
    const task = this.entityManager.create(Task, {
      user: {
        id: userId,
      },
      title: payload.title,
    });

    await this.entityManager.save(task);
  }

  async getTaskById(id: string): Promise<Task | null> {
    const taskById = await this.taskRepo.findOne({
      where: {
        id,
      },
    });

    if (!taskById) {
      return null;
    }

    return taskById;
  }

  async getAllTask(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  async editTitle(title: string, id: string): Promise<void> {
    await this.entityManager.update(
      Task,
      { id },
      { title, updatedDate: new Date() },
    );
  }
}
