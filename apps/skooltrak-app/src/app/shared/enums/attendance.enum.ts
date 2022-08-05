export class AttendanceEnum {
  public static PRESENT: AttendanceEnum = new AttendanceEnum(
    1,
    'Presente',
    true,
    'fas fa-check success-text'
  );
  public static ABSENT: AttendanceEnum = new AttendanceEnum(
    2,
    'Ausencia',
    false,
    'fas fa-times danger-text'
  );
  public static LATE: AttendanceEnum = new AttendanceEnum(
    3,
    'Tardanza',
    true,
    'far fa-clock clear-text'
  );

  public static ATTENDANCE_OPTIONS_LIST: AttendanceEnum[] = [
    AttendanceEnum.ABSENT,
    AttendanceEnum.PRESENT,
    AttendanceEnum.LATE
  ];
  constructor(
    public CODE: number,
    public DESCRIPTION: string,
    public PRESENT: boolean,
    public icon: string
  ) {}
}
