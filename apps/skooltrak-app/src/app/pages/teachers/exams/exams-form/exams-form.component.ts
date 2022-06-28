import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { FileInfo } from 'src/app/shared/models/documents.model';
import { Exam, ExamQuestion, MatchItem, Option } from 'src/app/shared/models/exams.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

import { AssignationComponent } from '../assignation/assignation.component';

interface Attachment extends File {
  uploaded?: true;
}
@Component({
  selector: 'skooltrak-exams-form',
  templateUrl: './exams-form.component.html',
  styleUrls: ['./exams-form.component.sass'],
})
export class ExamsFormComponent implements OnInit {
  @Input() exam: Exam;
  @Input() isOwner: boolean;
  @Output() saveExam = new EventEmitter<Exam>();
  courses$: Observable<Course[]>;
  examForm: UntypedFormGroup;
  saving = false;
  files: Attachment[] = [];
  attacheds: FileInfo[] = [];
  constructor(
    private fb: UntypedFormBuilder,
    private teachersService: TeachersService,
    private session: SessionService,
    public filesService: FilesService,
    private transloco: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.courses$ = this.teachersService.getCourses(
      this.session.currentUser.people[0].id
    );

    this.initForm();
  }

  initForm() {
    this.examForm = this.fb.group({
      id: [this.exam ? this.exam.id : ''],
      title: [this.exam ? this.exam.title : '', [Validators.required]],
      course: [this.exam ? this.exam.course : ''],
      documents: [this.exam?.documents ? this.exam.documents : []],
      questions: this.exam
        ? this.fb.array(this.initExistingQuestions())
        : this.fb.array([this.initQuestion()]),
    });
    this.attacheds = this.examForm.get('documents').value;
  }

  setFile(event: any): void {
    event.preventDefault();
    const element: HTMLElement = document.getElementById('attach-file');
    element.click();
  }

  addAttachment(file: any): void {
    const files = file.target.files as FileList;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < files.length; i++) {
      if (files[i].size / 1024 / 1024 > 10) {
        Swal.fire(
          this.transloco.translate('File not allowed'),
          this.transloco.translate('This file has to be less than 10MB'),
          'warning'
        );
      } else {
        const current = this.files.push(files[i]);
        this.filesService.uploadAttachment(files[i]).subscribe({
          next: (res) => {
            this.files[current - 1].uploaded = true;
            this.attacheds.push(res);
            this.examForm.get('documents').setValue(this.attacheds);
          },
          error: (err: Error) => {
            console.error(err);
          },
        });
      }
    }
  }

  removeAttachment(index: number) {
    this.filesService.deleteFile(this.attacheds[index].id).subscribe();
    this.attacheds.splice(index, 1);
    this.files.splice(index, 1);
    this.examForm.get('documents').setValue(this.attacheds);
  }

  initQuestion(question?: ExamQuestion): UntypedFormGroup {
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

  initExistingQuestions(): UntypedFormGroup[] {
    const controls: UntypedFormGroup[] = [];
    this.exam.questions.forEach((q) => {
      controls.push(this.initQuestion(q));
    });
    return controls;
  }

  initExistingMatchList(question: ExamQuestion): UntypedFormGroup[] {
    const controls: UntypedFormGroup[] = [];
    question.matchList.forEach((m) => {
      controls.push(this.initMatchItem(m));
    });
    return controls;
  }

  initMatchItem(item?: MatchItem): UntypedFormGroup {
    return this.fb.group({
      optionText: [item ? item.optionText : '', []],
      correctMatch: [item ? item.correctMatch : '', []],
    });
  }

  resetMatchSelection(form: UntypedFormGroup): void {
    const controls = form.controls.matchList as UntypedFormArray;
    while (controls.length) {
      controls.removeAt(0);
    }
    controls.push(this.initMatchItem());
  }

  addMatchItem(form: UntypedFormGroup): void {
    const control = form.controls.matchList as UntypedFormArray;
    control.push(this.initMatchItem());
  }

  removeMatchItem(questionId: number, index: number): void {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const question = this.examForm.controls['questions']['controls'][
      questionId
    ] as UntypedFormGroup;
    const control = question.controls.matchList as UntypedFormArray;
    control.removeAt(index);
  }

  addQuestion(): void {
    const control = this.examForm.controls.questions as UntypedFormArray;
    control.push(this.initQuestion());
  }

  removeQuestion(index: number): void {
    const control = this.examForm.controls.questions as UntypedFormArray;
    control.removeAt(index);
  }

  initOption(option?: Option): UntypedFormGroup {
    return this.fb.group({
      optionText: [option ? option.optionText : '', []],
      isCorrect: [option ? option.isCorrect : false],
    });
  }

  addOption(form: UntypedFormGroup): void {
    const control = form.controls.options as UntypedFormArray;
    control.push(this.initOption());
  }

  removeOption(questionId: number, index: number): void {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const question = this.examForm.controls['questions']['controls'][
      questionId
    ] as UntypedFormGroup;
    const control = question.controls.options as UntypedFormArray;
    control.removeAt(index);
  }

  initExistingOptions(question: ExamQuestion): UntypedFormGroup[] {
    const controls: UntypedFormGroup[] = [];
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
