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
        name: 'string'
      },
      code: 'string',
      createDate: '2020-02-25T01:37:55.494Z',
      modificateDate: '2020-02-25T01:37:55.494Z'
    },
    plan: {
      id: 'string',
      name: 'string'
    },
    teachers: [
      {
        id: 'string',
        name: 'string'
      }
    ],
    weeklyHours: 0,
    buckets: [
      {
        id: 0,
        name: 'string',
        weighting: 0
      }
    ],
    createDate: '2020-02-25T01:37:55.494Z',
    modificateDate: '2020-02-25T01:37:55.494Z',
    active: true
  };
}
