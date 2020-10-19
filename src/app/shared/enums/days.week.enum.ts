import { Course } from '../models/studyplans.model';

export class DaysEnum {
  public static MONDAY: DaysEnum = new DaysEnum(1, 'Monday', false);
  public static TUESDAY: DaysEnum = new DaysEnum(2, 'Tuesday', false);
  public static WEDNESDAY: DaysEnum = new DaysEnum(3, 'Wednesday', false);
  public static THURSDAY: DaysEnum = new DaysEnum(4, 'Thursday', false);
  public static FRIDAY: DaysEnum = new DaysEnum(5, 'Friday', false);
  public static SATURDAY: DaysEnum = new DaysEnum(6, 'Saturday', true);
  public static SUNDAY: DaysEnum = new DaysEnum(1, 'SUNDAY', true);

  public static WEEK_DAYS: DaysEnum[] = [
    DaysEnum.MONDAY,
    DaysEnum.TUESDAY,
    DaysEnum.WEDNESDAY,
    DaysEnum.THURSDAY,
    DaysEnum.FRIDAY,
  ];

  public static ALL_WEEK_DAYS: DaysEnum[] = [
    DaysEnum.MONDAY,
    DaysEnum.TUESDAY,
    DaysEnum.WEDNESDAY,
    DaysEnum.THURSDAY,
    DaysEnum.FRIDAY,
    DaysEnum.SATURDAY,
    DaysEnum.SUNDAY,
  ];

  public static RECCESS: Course = {
    id: '5e28474205c7ad75b31d9bb0',
    name: 'Reccess',
    subject: {
      id: '5e28474205c7ad75b31d9bb0',
      name: 'Reccess',
    },
  };

  constructor(
    public day: number,
    public name: string,
    public isWeekend: boolean
  ) {}
}
