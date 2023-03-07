import { Provider } from '@nestjs/common';
import { Repositories } from 'src/shared/enums/repositories.enum';
import { Notifications } from './notifications.entity';

export const notificationsProviders: Provider[] = [
  {
    provide: Repositories.Notifications,
    useValue: Notifications,
  },
];
