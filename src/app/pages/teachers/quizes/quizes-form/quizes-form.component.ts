import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Option, Question, Quiz } from 'src/app/shared/models/quizes.model';
import { StudyPlan } from 'src/app/shared/models/studyplans.model';
import { Subject } from 'src/app/shared/models/subjects.model';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';

@Component({
  selector: 'app-quizes-form',
  templateUrl: './quizes-form.component.html',
  styleUrls: ['./quizes-form.component.sass']
})
export class QuizesFormComponent implements OnInit {
  @Input() quiz: Quiz;
  @Output() saveQuiz = new EventEmitter<Quiz>();
  subjects: Observable<Subject[]>;
  plans: Observable<StudyPlan[]>;
  quizForm: FormGroup;

  constructor(
    private subjectsService: SubjectsService,
    private planService: StudyPlanService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.plans = this.planService.getAll();
    this.subjects = this.subjectsService.getAll();
    this.quizForm = this.fb.group({
      id: [this.quiz ? this.quiz.id : ''],
      title: [
        this.quiz ? this.quiz.title : '',
        [Validators.required]
      ],
      level: [this.quiz ? this.quiz.level : ''],
      subject: [this.quiz ? this.quiz.subject : ''],
      questions: this.quiz
        ? this.fb.array(this.initExistingQuestions())
        : this.fb.array([this.initQuestion()])
    });
  }

  initQuestion(question?: Question): FormGroup {
    return this.fb.group({
      questionText: [
        question ? question.questionText : '',
        [Validators.required]
      ],
      points: [
        question ? question.points : 0,
        [Validators.required, Validators.min(1)]
      ],
      options: question
        ? this.fb.array(this.initExistingOptions(question))
        : this.fb.array([this.initOption()])
    });
  }

  initExistingQuestions(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.quiz.questions.forEach(q => {
      controls.push(this.initQuestion(q));
    });
    return controls;
  }

  addQuestion(): void {
    const control = this.quizForm.controls.questions as FormArray;
    control.push(this.initQuestion());
  }

  initOption(option?: Option): FormGroup {
    return this.fb.group({
      optionText: [option ? option.optionText : '', [Validators.required]],
      isCorrect: [option ? option.isCorrect : false]
    });
  }

  initExistingOptions(question: Question): FormGroup[] {
    const controls: FormGroup[] = [];
    question.options.forEach(o => {
      controls.push(this.initOption(o));
    });
    return controls;
  }

  save() {
    this.saveQuiz.emit(this.quizForm.value);
  }

  removeQuestion(index: number): void {
    const control = this.quizForm.controls.questions as FormArray;
    control.removeAt(index);
  }

  addOption(form: FormGroup): void {
    const control = form.controls.options as FormArray;
    control.push(this.initOption());
  }

  removeOption(questionId: number, index: number): void {
    const question = this.quizForm.controls['questions']['controls'][
      questionId
    ] as FormGroup;
    const control = question.controls.options as FormArray;
    control.removeAt(index);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
