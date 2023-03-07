import { Provider } from '@nestjs/common';
import { Repositories } from 'src/shared/enums/repositories.enum';
import { Users } from './users.entity';

export const usersProviders: Provider[] = [
  {
    provide: Repositories.Users,
    useValue: Users,
  },
];
