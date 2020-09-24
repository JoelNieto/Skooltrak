import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Exam, ExamQuestion, MatchItem } from 'src/app/shared/models/exams.model';
import { Option } from 'src/app/shared/models/quizes.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

import { AssignationComponent } from '../assignation/assignation.component';

@Component({
  selector: 'app-exams-form',
  templateUrl: './exams-form.component.html',
  styleUrls: ['./exams-form.component.sass'],
})
export class ExamsFormComponent implements OnInit {
  @Input() exam: Exam;
  @Input() isOwner: boolean;
  @Output() saveExam = new EventEmitter<Exam>();
  courses: Observable<Course[]>;
  examForm: FormGroup;
  saving = false;
  constructor(
    private fb: FormBuilder,
    private teachersService: TeachersService,
    private coursesService: CoursesService,
    private session: SessionService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.isOwner) {
      this.courses = this.teachersService.getCourses(
        this.session.currentUser.people[0].id
      );
    } else {
      this.courses = this.coursesService.getAll();
    }
    this.initForm();
  }

  initForm() {
    this.examForm = this.fb.group({
      id: [this.exam ? this.exam.id : ''],
      title: [this.exam ? this.exam.title : '', [Validators.required]],
      course: [this.exam ? this.exam.course : ''],
      questions: this.exam
        ? this.fb.array(this.initExistingQuestions())
        : this.fb.array([this.initQuestion()]),
    });
  }

  initQuestion(question?: ExamQuestion): FormGroup {
    return this.fb.group({
      questionText: [
        question ? question.questionText : '',
        [Validators.required],
      ],
      points: [
        question ? question.points : 0,
        [Validators.required, Validators.min(1)],
      ],
      type: [question ? question.type : '', [Validators.required]],
      options: question
        ? this.fb.array(this.initExistingOptions(question))
        : this.fb.array([this.initOption()]),
      matchList: question
        ? this.fb.array(this.initExistingMatchList(question))
        : this.fb.array([this.initMatchItem()]),
      trueFalse: [question ? question.trueFalse : false],
    });
  }

  initExistingQuestions(): FormGroup[] {
    const controls: FormGroup[] = [];
    this.exam.questions.forEach((q) => {
      controls.push(this.initQuestion(q));
    });
    return controls;
  }

  initExistingMatchList(question: ExamQuestion): FormGroup[] {
    const controls: FormGroup[] = [];
    question.matchList.forEach((m) => {
      controls.push(this.initMatchItem(m));
    });
    return controls;
  }

  initMatchItem(item?: MatchItem): FormGroup {
    return this.fb.group({
      optionText: [item ? item.optionText : '', []],
      correctMatch: [item ? item.correctMatch : '', []],
    });
  }

  resetMatchSelection(form: FormGroup): void {
    const controls = form.controls.matchList as FormArray;
    while (controls.length) {
      controls.removeAt(0);
    }
    controls.push(this.initMatchItem());
  }

  addMatchItem(form: FormGroup): void {
    const control = form.controls.matchList as FormArray;
    control.push(this.initMatchItem());
  }

  removeMatchItem(questionId: number, index: number): void {
    const question = this.examForm.controls['questions']['controls'][
      questionId
    ] as FormGroup;
    const control = question.controls.matchList as FormArray;
    control.removeAt(index);
  }

  addQuestion(): void {
    const control = this.examForm.controls.questions as FormArray;
    control.push(this.initQuestion());
  }

  removeQuestion(index: number): void {
    const control = this.examForm.controls.questions as FormArray;
    control.removeAt(index);
  }

  initOption(option?: Option): FormGroup {
    return this.fb.group({
      optionText: [option ? option.optionText : '', []],
      isCorrect: [option ? option.isCorrect : false],
    });
  }

  addOption(form: FormGroup): void {
    const control = form.controls.options as FormArray;
    control.push(this.initOption());
  }

  removeOption(questionId: number, index: number): void {
    const question = this.examForm.controls['questions']['controls'][
      questionId
    ] as FormGroup;
    const control = question.controls.options as FormArray;
    control.removeAt(index);
  }

  initExistingOptions(question: ExamQuestion): FormGroup[] {
    const controls: FormGroup[] = [];
    question.options.forEach((o) => {
      controls.push(this.initOption(o));
    });
    return controls;
  }

  save() {
    this.saving = true;
    this.saveExam.emit(this.examForm.value);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  assignExam() {
    const modalRef = this.modal.open(AssignationComponent, { size: 'lg' });
    modalRef.componentInstance.exam = this.exam;
  }

  compareType(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.code === c2.code : c1 === c2;
  }


}
