import { Classroom } from '../models/classrooms.model';

export class ClassroomsMock {
  public static sample: Classroom = {
    id: 'string',
    name: 'string',
    description: 'string',
    groups: [
      {
        id: 'string',
        schoolId: 'string',
        level: {
          id: 0,
          name: 'string',
          ordinal: 'string',
        },
        name: 'string',
        counselor: {
          id: 'string',
          name: 'string',
        },
        schedule: [],
      },
    ],
    public: true,
    createdAt: new Date(),
    createdBy: {
      id: 'string',
      userName: 'string',
      displayName: 'string',
      registerDate: '',
      blocked: true,
      meetingBlocked: true,
      email: 'string',
      notificationMails: ['string'],
      adminAccess: [
        {
          name: 'string',
          id: '0',
        },
      ],
      group: {
        id: 'string',
        schoolId: 'string',
        level: {
          id: 0,
          name: 'string',
          ordinal: 'string',
        },
        name: 'string',
        counselor: {
          id: 'string',
          name: 'string',
        },
        schedule: [],
      },
      people: [
        {
          id: 'string',
          name: 'string',
        },
      ],
      role: {
        id: 'string',
        name: 'string',
        code: 0,
        description: 'string',
      },
      photoURL: 'string',
      updatedAt: new Date(),
    },
  };
}
