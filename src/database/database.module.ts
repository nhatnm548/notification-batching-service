import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { notificationsProviders } from './entities/notifications/notifications.provider';
import { postsLikesProviders } from './entities/posts-likes/posts-likes.provider';
import { postsProviders } from './entities/posts/posts.provider';
import { usersProviders } from './entities/users/users.provider';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    ...postsProviders,
    ...usersProviders,
    ...postsLikesProviders,
    ...notificationsProviders
  ],
  exports: [
    ...databaseProviders,
    ...postsProviders,
    ...usersProviders,
    ...postsLikesProviders,
    ...notificationsProviders
  ],
})
export class DatabaseModule {}
