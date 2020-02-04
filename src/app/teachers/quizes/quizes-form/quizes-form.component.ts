import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Quiz, Question, Option } from 'src/app/shared/models/quizes.model';
import { Level } from 'src/app/shared/models/studyplans.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { Subject } from 'src/app/shared/models/subjects.model';

@Component({
  selector: 'app-quizes-form',
  templateUrl: './quizes-form.component.html',
  styleUrls: ['./quizes-form.component.sass']
})
export class QuizesFormComponent implements OnInit {
  @Input() quiz: Quiz;
  @Output() saveQuiz = new EventEmitter<Quiz>();
  subjects: Observable<Subject[]>;
  quizForm: FormGroup;
  levels: Level[] = [
    { id: 0, name: 'Pre-Escolar', ordinal: 'K' },
    { id: 1, name: 'Primero', ordinal: '1º' },
    { id: 2, name: 'Segundo', ordinal: '2º' },
    { id: 3, name: 'Tercero', ordinal: '3º' },
    { id: 4, name: 'Cuarto', ordinal: '4º' },
    { id: 5, name: 'Quinto', ordinal: '5º' },
    { id: 6, name: 'Sexto', ordinal: '6º' },
    { id: 7, name: 'Séptimo', ordinal: '7º' },
    { id: 8, name: 'Octavo', ordinal: '8º' },
    { id: 9, name: 'Noveno', ordinal: '9º' },
    { id: 5, name: 'Décimo', ordinal: '10º' },
    { id: 5, name: 'Undécimo', ordinal: '11º' },
    { id: 5, name: 'Duedécimo', ordinal: '12º' }
  ];
  constructor(
    private subjectsService: SubjectsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subjects = this.subjectsService.getAll();
    this.quizForm = this.fb.group({
      id: [this.quiz ? this.quiz.id : ''],
      title: [
        this.quiz ? this.quiz.title : '',
        [Validators.required, Validators.minLength(5)]
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
