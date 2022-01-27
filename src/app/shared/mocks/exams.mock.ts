import { Exam } from '../models/exams.model';
import { CourseMock } from './course.mock';
import { UserMock } from './user.mock';

export class ExamsMock {
  public static sample: Exam = {
    id: 'string',
    title: 'string',
    description: 'string',
    course: CourseMock.sample,
    teacher: {
      id: 'string',
      code: 'string',
      schoolId: 'string',
      firstName: 'string',
      middleName: 'string',
      surname: 'string',
      secondSurname: 'string',
      name: 'string',
      birthDate: new Date(),
      email: 'string',
      gender: {
        id: 0,
        name: 'string',
      },
      subjects: [
        {
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
      ],
      createDate: new Date(),
      modificateDate: new Date(),
    },
    createUser: UserMock.sample,
    createDate: new Date(),
    modificateDate: new Date(),
  };
}
