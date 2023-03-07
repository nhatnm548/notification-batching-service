import { Provider } from '@nestjs/common';
import { Repositories } from 'src/shared/enums/repositories.enum';
import { Posts } from './posts.entity';

export const postsProviders: Provider[] = [
  {
    provide: Repositories.Posts,
    useValue: Posts,
  },
];
