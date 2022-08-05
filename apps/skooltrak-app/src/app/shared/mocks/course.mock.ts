import { Course } from '../models/studyplans.model';

export class CourseMock {
  public static sample: Course = {
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
    plan: {
      id: 'string',
      name: 'string',
      preschool: false,
    },
    teachers: [
      {
        id: 'string',
        name: 'string',
      },
    ],
    weeklyHours: 0,
    buckets: [
      {
        id: 0,
        name: 'string',
        weighting: 0,
      },
    ],
    createDate: new Date(),
    modificateDate: new Date(),
    active: true,
  };
}
