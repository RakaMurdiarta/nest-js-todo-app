import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Timestamp {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  deletedDate: Date;
}

export abstract class BaseModel extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
