import { User } from '../models/users.model';

export class UserMock {
  public static sample: User = {
    id: 'string',
    userName: 'wtr',
    password: '',
    displayName: 'string',
    email: 'string',
    photoURL: 'string',
    role: {
      id: 'string',
      name: 'string',
      code: 1
    },
    people: [
      {
        id: 'string',
        name: 'string'
      }
    ],
    registerDate: '2020-01-21T05:14:52.614Z'
  };
}
