import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Option, Question, Quiz } from 'src/app/shared/models/quizes.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

import { AssignationComponent } from '../assignation/assignation.component';

@Component({
  selector: 'skooltrak-quizes-form',
  templateUrl: './quizes-form.component.html',
  styleUrls: ['./quizes-form.component.sass'],
})
export class QuizesFormComponent implements OnInit {
  @Input() quiz: Quiz;
  @Input() isOwner: boolean;
  @Output() saveQuiz = new EventEmitter<Quiz>();
  courses$: Observable<Course[]>;
  quizForm: FormGroup;
  saving = false;

  constructor(
    private teachersService: TeachersService,
    private coursesService: CoursesService,
    private session: SessionService,
    private modal: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.isOwner) {
      this.courses$ = this.teachersService.getCourses(
        this.session.currentUser.people[0].id
      );
    } else {
      this.courses$ = this.coursesService.getAll();
    }

    this.quizForm = this.fb.group({
      id: [this.quiz ? this.quiz.id : ''],
      title: [this.quiz ? this.quiz.title : '', [Validators.required]],
      course: [this.quiz ? this.quiz.course : ''],
      questions: this.quiz
        ? this.fb.array(this.initExistingQuestions())
        : this.fb.array([this.initQuestion()]),
    });
    if (!this.isOwner) {
      this.quizForm.get('course').disable();
      this.quizForm.get('title').disable();
      this.quizForm.get('questions').disable();
    }
  }

  initQuestion(question?: Question): FormGroup {
    return this.fb.group({
      questionText: [
        question ? question.questionText : '',
        [Validators.required],
      ],
      points: [
        question ? question.points : 0,
        [Validators.required, Validators.min(1)],
      ],
      options: question
        ? this.fb.array(this.initExistingOptions(question))
        : this.fb.array([this.initOption()]),
    });
  }

  initExistingQuestions(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.quiz.questions.forEach((q) => {
      controls.push(this.initQuestion(q));
    });
    return controls;
  }

  addQuestion(): void {
    if (this.isOwner) {
      const control = this.quizForm.controls.questions as FormArray;
      control.push(this.initQuestion());
    }
  }

  initOption(option?: Option): FormGroup {
    return this.fb.group({
      optionText: [option ? option.optionText : '', [Validators.required]],
      isCorrect: [option ? option.isCorrect : false],
    });
  }

  initExistingOptions(question: Question): FormGroup[] {
    const controls: FormGroup[] = [];
    question.options.forEach((o) => {
      controls.push(this.initOption(o));
    });
    return controls;
  }

  save() {
    this.saving = true;
    this.saveQuiz.emit(this.quizForm.value);
  }

  removeQuestion(index: number): void {
    if (this.isOwner) {
      const control = this.quizForm.controls.questions as FormArray;
      control.removeAt(index);
    }
  }

  addOption(form: FormGroup): void {
    if (this.isOwner) {
      const control = form.controls.options as FormArray;
      control.push(this.initOption());
    }
  }

  removeOption(questionId: number, index: number): void {
    if (this.isOwner) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const question = this.quizForm.controls['questions']['controls'][
        questionId
      ] as FormGroup;
      const control = question.controls.options as FormArray;
      control.removeAt(index);
    }
  }

  assignQuiz() {
    const modalRef = this.modal.open(AssignationComponent, { size: 'lg' });
    modalRef.componentInstance.quiz = this.quiz;
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
