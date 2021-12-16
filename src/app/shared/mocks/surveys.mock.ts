import { Survey, SurveyOption, SurveyQuestion } from '../models/surveys.model';
import { GroupMock } from './groups.mock';
import { UserMock } from './user.mock';

export class SurveysMock {
  public static optionSample: SurveyOption = { answerText: '', count: 1 };
  public static questionSample: SurveyQuestion = {
    questionText: '',
    options: [this.optionSample],
    answerIndex: 0,
    answerText: '',
  };
  public static sample: Survey = {
    id: '',
    title: '',
    description: '',
    questions: [this.questionSample],
    beginDate: new Date(),
    endDate: new Date(),
    allUsers: true,
    groups: [GroupMock.sample],
    createDate: new Date(),
    createUser: UserMock.sample,
  };
}
