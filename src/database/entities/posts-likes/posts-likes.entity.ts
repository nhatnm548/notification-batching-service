import {
  Column,
  Table,
  Model,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Posts } from '../posts/posts.entity';
import { Users } from '../users/users.entity';

@Table
export class PostsLikes extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => Posts)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  postId: string;

  @BelongsTo(() => Posts)
  post: Posts;
}
