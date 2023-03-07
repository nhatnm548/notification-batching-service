import {
  Column,
  Table,
  Model,
  PrimaryKey,
  DataType,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { Posts } from '../posts/posts.entity';

@Table
export class Users extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Unique
  @Column
  username: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasMany(() => Posts)
  posts: Posts[];
}
