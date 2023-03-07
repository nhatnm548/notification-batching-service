import { Provider } from '@nestjs/common';
import { Repositories } from 'src/shared/enums/repositories.enum';
import { PostsLikes } from './posts-likes.entity';

export const postsLikesProviders: Provider[] = [
  {
    provide: Repositories.PostsLikes,
    useValue: PostsLikes,
  },
];
