import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Survey,
  SurveyOption,
  SurveyQuestion,
} from 'src/app/shared/models/surveys.model';
import { addMinutes, getYear, getMonth, getDate } from 'date-fns';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.sass'],
})
export class SurveyFormComponent implements OnInit {
  @Input() survey: Survey;
  @Output() saveSurvey = new EventEmitter<Survey>();

  form: FormGroup;
  startHours = { hour: 7, minute: 0 };
  endHours = { hour: 17, minute: 0 };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.survey ? this.survey.id : ''],
      title: [this.survey ? this.survey.title : '', [Validators.required]],
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

  initQuestion(question?: SurveyQuestion): FormGroup {
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

  initOption(option?: SurveyOption): FormGroup {
    return this.fb.group({
      answerText: [option ? option.answerText : '', [Validators.required]],
    });
  }

  initExistingQuestions(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.survey.questions.forEach((q) => {
      controls.push(this.initQuestion(q));
    });
    return controls;
  }

  addQuestion(): void {
    const control = this.form.controls.questions as FormArray;
    control.push(this.initQuestion());
  }

  removeQuestion(index: number): void {
    const control = this.form.controls.questions as FormArray;
    control.removeAt(index);
  }

  addOption(form: FormGroup): void {
    const control = form.controls.options as FormArray;
    control.push(this.initOption());
  }

  removeOption(questionId: number, index: number): void {
    const question = this.form.get('questions')['controls'][questionId] as FormGroup;
    const control = question.controls.options as FormArray;
    control.removeAt(index);
  }

  initExistingOptions(question: SurveyQuestion): FormGroup[] {
    const controls: FormGroup[] = [];
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
