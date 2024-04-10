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
import { TaskList } from './taskList.entity';
import { User } from './user.entity';
@Entity('task')
export class Task extends BaseModel {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'boolean', default: false, name: 'is_completed' })
  isCompleted: boolean;

  @OneToMany(() => TaskList, (t) => t.task, {
    onDelete: 'CASCADE',
  })
  taskList: TaskList[];

  @ManyToOne(() => User, (u) => u.task, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  @Index()
  user: User;
}
