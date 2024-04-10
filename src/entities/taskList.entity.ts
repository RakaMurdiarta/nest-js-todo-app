import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseModel } from './utils/base';
import { Task } from './task.entity';
@Entity('task_list')
export class TaskList extends BaseModel {
  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar' })
  status: string;

  @ManyToOne(() => Task, (t) => t.taskList, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'task_id' })
  @Index()
  task: Task;
}
