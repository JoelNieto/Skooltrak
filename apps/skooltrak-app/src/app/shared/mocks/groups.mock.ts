import { ClassGroup } from '../models/studyplans.model';

export class GroupMock {
  public static sample: ClassGroup = {
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
    studyPlan: {
      id: 'string',
      name: 'string',
    },
    studentsCount: 0,
    createDate: new Date(),
    schedule: [
      {
        day: 0,
        name: 'string',
        classHours: [
          {
            startTime: {
              hour: 0,
              minute: 0,
            },
            endTime: {
              hour: 0,
              minute: 0,
            },
            isSync: true,
            inPerson: true,
            course: {
              id: 'string',
              name: 'string',
              subject: {
                id: 'string',
                name: 'string',
                shortName: 'string',
                parent: {
                  id: 'string',
                  name: 'string',
                },
                code: 'string',
                createDate: new Date(),
                modificateDate: new Date(),
              },
              parentSubject: {
                id: 'string',
                name: 'string',
                shortName: 'string',
                parent: {
                  id: 'string',
                  name: 'string',
                },
                code: 'string',
                createDate: new Date(),
                modificateDate: new Date(),
              },
              color: 'string',
              icon: 'string',
            },
          },
        ],
      },
    ],
    modificateDate: new Date(),
  };
}
