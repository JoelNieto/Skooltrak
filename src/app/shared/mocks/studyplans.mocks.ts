import { StudyPlan } from '../models/studyplans.model';

export class StudyPlanMock {
  public static sample: StudyPlan = {
    id: 'string',
    name: 'string',
    schoolId: 'string',
    degree: {
      id: 'string',
      name: 'string',
    },
    description: 'string',
    level: {
      id: 0,
      name: 'string',
      ordinal: 'string',
    },
    active: true,
    preschool: true,
    createDate: new Date(),
    modificateDate: new Date(),
    monthlyCost: 0,
    enrollCharges: [
      {
        description: 'string',
        cost: 0,
      },
    ],
    skills: ['string'],
    hasUser: true,
  };
}
