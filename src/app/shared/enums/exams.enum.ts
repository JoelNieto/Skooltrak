export class QuestionEnum {
  public static TRUEFALSE: QuestionEnum = new QuestionEnum(0, 'TrueFalse');
  public static SELECTION: QuestionEnum = new QuestionEnum(1, 'Selection');
  public static TEXT: QuestionEnum = new QuestionEnum(2, 'Text');
  public static LONGTEXT: QuestionEnum = new QuestionEnum(3, 'LongText');
  public static NUMBER: QuestionEnum = new QuestionEnum(4, 'Number');
  public static MATCH: QuestionEnum = new QuestionEnum(5, 'Match');

  public static QUESTION_TYPES: QuestionEnum[] = [
    QuestionEnum.TRUEFALSE,
    QuestionEnum.SELECTION,
    QuestionEnum.TEXT,
    QuestionEnum.LONGTEXT,
    QuestionEnum.NUMBER,
    QuestionEnum.MATCH,
  ];
  constructor(public code: number, public name: string) {}
}
