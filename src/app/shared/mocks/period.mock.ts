import { Period } from '../models/periods.model';

export class PeriodMock {
  public static sample: Period = {
    id: 'string',
    sort: 0,
    name: 'string',
    startDate: new Date(),
    endDate: new Date(),
  };
}
