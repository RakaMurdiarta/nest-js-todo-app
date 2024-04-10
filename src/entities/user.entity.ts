import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { BaseModel } from './utils/base';
import { Task } from './task.entity';
import { Role } from './role.entity';

@Entity('user')
export class User extends BaseModel {
  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean', default: false, name: 'is_verified' })
  isVerified: boolean;

  @OneToMany(() => Task, (t) => t.user, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  task: Task[];

  @ManyToOne(() => Role, (r) => r.user, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'role_id' })
  @Index()
  role: Role;
}
