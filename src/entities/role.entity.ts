import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from './utils/base';
import { User } from './user.entity';

@Entity('role')
export class Role extends BaseModel {
  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({ type: 'boolean', default: false, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => User, (u) => u.role, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User[];
}
