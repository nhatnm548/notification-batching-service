import {
  Column,
  Table,
  Model,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { PostsLikes } from '../posts-likes/posts-likes.entity';
import { Users } from '../users/users.entity';

@Table
export class Posts extends Model {
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

  @Column({
    allowNull: true,
  })
  lastNotifiedAt: Date;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => Users)
  user: Users;

  @HasMany(() => PostsLikes)
  likes: PostsLikes[];
}
