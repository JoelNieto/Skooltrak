import { Incident } from '../models/incidents.model';
import { CourseMock } from './course.mock';
import { StudentsMock } from './student.mock';
import { UserMock } from './user.mock';

export class IncidentsMock {
  public static sample: Incident = {
    id: 'string',
    title: 'string',
    details: 'string',
    student: StudentsMock.sample,
    course: CourseMock.sample,
    incidentDate: new Date(),
    documents: [
      {
        id: '',
        fileName: 'string',
        size: 0,
        type: 'string',
      },
    ],
    checks: [
      {
        user: UserMock.sample,
        checkedAt: new Date(),
      },
    ],
    updates: [
      {
        user: UserMock.sample,
        details: 'string',
        action: {
          id: 'string',
          name: 'string',
        },
        createdAt: new Date(),
      },
    ],
    createdBy: UserMock.sample,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
