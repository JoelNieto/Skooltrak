import { Forum } from '../models/forums.model';
import { CourseMock } from './course.mock';
import { UserMock } from './user.mock';

export class ForumMock {
  public static sample: Forum = {
    id: 'string',
    name: 'string',
    course: CourseMock.sample,
    description: 'string',
    createDate: new Date(),
    createdBy: UserMock.sample,
    lastPost: new Date(),
    posts: 0
  };
}
