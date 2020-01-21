import { User } from '../models/users.model';

export class UserMock {
  public static sample: User = {
    id: 'string',
    providerId: 'string',
    displayName: 'string',
    email: 'string',
    photoURL: 'string',
    roles: [
      {
        id: 'string',
        name: 'string',
        access: [
          {
            id: 'string',
            name: 'string',
            description: 'string'
          }
        ]
      }
    ],
    registerDate: '2020-01-21T05:14:52.614Z'
  };
}
