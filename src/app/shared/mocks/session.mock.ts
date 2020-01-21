import { UserMock } from './user.mock';

export class SessionMock {
  public currentUser = UserMock;
  public currentSchool = {
    id: 'string',
    name: 'string',
    shortName: 'string',
    logoURL: 'string',
    address: 'string',
    website: 'string',
    motto: 'string',
    contacts: [
      {
        name: 'string',
        type: 'string',
        contactText: 'string',
        active: true
      }
    ],
    createDate: new Date(),
    modificateDate: new Date(),
    createUser: 'string',
    updateUser: 'string',
    createTerminal: 'string',
    updateTerminal: 'string'
  };
}
