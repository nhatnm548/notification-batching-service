import {
  Column,
  Table,
  Model,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table
export class Notifications extends Model {
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

  @Column
  content: string;
}
