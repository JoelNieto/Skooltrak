import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { addMinutes, getDate, getMonth, getYear } from 'date-fns';
import { Survey, SurveyOption, SurveyQuestion } from 'src/app/shared/models/surveys.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'skooltrak-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.sass'],
})
export class SurveyFormComponent implements OnInit {
  @Input() survey: Survey;
  @Output() saveSurvey = new EventEmitter<Survey>();
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 100,
    minHeight: 50,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['picture', 'link', 'video']],
      ['view', ['help', 'code']],
    ],
  };
  form: UntypedFormGroup;
  startHours = { hour: 7, minute: 0 };
  endHours = { hour: 17, minute: 0 };
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.survey ? this.survey.id : ''],
      title: [this.survey ? this.survey.title : '', [Validators.required]],
      description: [this.survey ? this.survey.description : ''],
      questions: this.survey
        ? this.fb.array(this.initExistingQuestions())
        : this.fb.array([this.initQuestion()]),
      beginDate: [
        this.survey ? this.survey.beginDate : '',
        [Validators.required],
      ],
      beginHour: [
        this.survey
          ? {
              hour: new Date(this.survey.beginDate).getHours(),
              minute: new Date(this.survey.beginDate).getMinutes(),
            }
          : this.startHours,
      ],
      endDate: [this.survey ? this.survey.endDate : '', [Validators.required]],
      endHour: [
        this.survey
          ? {
              hour: new Date(this.survey.endDate).getHours(),
              minute: new Date(this.survey.endDate).getMinutes(),
            }
          : this.endHours,
      ],
    });
  }

  initQuestion(question?: SurveyQuestion): UntypedFormGroup {
    return this.fb.group({
      questionText: [
        question ? question.questionText : '',
        [Validators.required],
      ],
      options: question
        ? this.fb.array(this.initExistingOptions(question))
        : this.fb.array([this.initOption()]),
    });
  }

  initOption(option?: SurveyOption): UntypedFormGroup {
    return this.fb.group({
      answerText: [option ? option.answerText : '', [Validators.required]],
    });
  }

  initExistingQuestions(): UntypedFormGroup[] {
    const controls: UntypedFormGroup[] = [];
    this.survey.questions.forEach((q) => {
      controls.push(this.initQuestion(q));
    });
    return controls;
  }

  addQuestion(): void {
    const control = this.form.controls.questions as UntypedFormArray;
    control.push(this.initQuestion());
  }

  removeQuestion(index: number): void {
    const control = this.form.controls.questions as UntypedFormArray;
    control.removeAt(index);
  }

  addOption(form: UntypedFormGroup): void {
    const control = form.controls.options as UntypedFormArray;
    control.push(this.initOption());
  }

  removeOption(questionId: number, index: number): void {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const question = this.form.get('questions')['controls'][
      questionId
    ] as UntypedFormGroup;
    const control = question.controls.options as UntypedFormArray;
    control.removeAt(index);
  }

  initExistingOptions(question: SurveyQuestion): UntypedFormGroup[] {
    const controls: UntypedFormGroup[] = [];
    question.options.forEach((o) => {
      controls.push(this.initOption(o));
    });
    return controls;
  }

  save() {
    const survey: Survey = this.form.value;
    const startHours = this.form.get('beginHour').value;
    const endHours = this.form.get('endHour').value;
    survey.beginDate = new Date(survey.beginDate);
    survey.endDate = new Date(survey.endDate);
    survey.beginDate = addMinutes(
      survey.beginDate,
      survey.beginDate.getTimezoneOffset()
    );
    survey.beginDate = new Date(
      getYear(survey.beginDate),
      getMonth(survey.beginDate),
      getDate(survey.beginDate),
      startHours.hour,
      startHours.minute
    );

    survey.endDate = addMinutes(
      survey.endDate,
      survey.endDate.getTimezoneOffset()
    );
    survey.endDate = new Date(
      getYear(survey.endDate),
      getMonth(survey.endDate),
      getDate(survey.endDate),
      endHours.hour,
      endHours.minute
    );
    this.saveSurvey.emit(this.form.value);
  }
}