import { Sequelize } from 'sequelize-typescript';
import { Notifications } from './entities/notifications/notifications.entity';
import { PostsLikes } from './entities/posts-likes/posts-likes.entity';
import { Posts } from './entities/posts/posts.entity';
import { Users } from './entities/users/users.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: false,
      });
      sequelize.addModels([Posts, Users, PostsLikes, Notifications]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
