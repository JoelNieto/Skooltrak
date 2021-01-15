import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Assignment, AssignmentType } from '../../models/assignments.model';
import { ClassGroup, Course } from '../../models/studyplans.model';
import { AssignmentService } from '../../services/assignments.service';
import { AssignmentTypesService } from '../../services/assignmenttypes.service';
import { CoursesService } from '../../services/courses.service';
import { SessionService } from '../../services/session.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.sass'],
})
export class AssignmentFormComponent implements OnInit {
  @Input() course: Course;

  assignmentForm: FormGroup;
  assignment: Assignment;
  courses: Observable<Course[]>;
  groups: Observable<ClassGroup[]>;
  types: Observable<AssignmentType[]>;
  minDate: NgbDateStruct = { year: new Date().getFullYear(), month: 1, day: 1 };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31,
  };
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 100,
    minHeight: 100,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
  };
  constructor(
    public modal: NgbActiveModal,
    private assignmentService: AssignmentService,
    private coursesService: CoursesService,
    private teacherService: TeachersService,
    private typesService: AssignmentTypesService,
    private session: SessionService,
    private fb: FormBuilder,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.types = this.typesService.getAll();
    this.courses = this.teacherService.getCourses(
      this.session.currentUser.people[0].id
    );
    this.assignmentForm = this.fb.group({
      id: [this.assignment?.id, []],
      title: [
        this.assignment ? this.assignment.title : '',
        [Validators.required],
      ],
      dueDate: [this.assignment ? this.assignment.dueDate : undefined],
      startDate: [
        this.assignment ? this.assignment.startDate : undefined,
        [Validators.required],
      ],
      description: [this.assignment ? this.assignment.description : '', []],
      type: [
        this.assignment ? this.assignment.type : undefined,
        [Validators.required],
      ],
      course: [
        this.assignment ? this.assignment.course : undefined,
        [Validators.required],
      ],
      group: [
        this.assignment ? this.assignment.group : undefined,
        [Validators.required],
      ],
      uploadFile: [this.assignment ? this.assignment.uploadFile : false, []],
      uploadVideo: [this.assignment ? this.assignment.uploadVideo : false, []],
      hasForum: [this.assignment ? this.assignment.hasForum : false, []],
      teacher: [
        this.assignment
          ? this.assignment.teacher
          : this.session.currentUser.people[0],
      ],
    });
    if (!this.assignment?.type) {
      this.assignmentForm.get('type').setValue(undefined);
    }
    if (!this.assignment?.course) {
      if (this.course) {
        this.assignmentForm.get('course').setValue(this.course);
        this.groups = this.coursesService.getGroups(this.course.id);
        this.assignmentForm.get('group').setValue(undefined);
      } else {
        this.assignmentForm.get('course').setValue(undefined);
      }
    } else {
      this.groups = this.coursesService.getGroups(this.assignment.course.id);
      this.assignmentForm.get('group').setValue(this.assignment.group);
    }
    this.onChanges();
  }

  onChanges(): void {
    this.assignmentForm.get('course').valueChanges.subscribe((val: Course) => {
      if (val?.id) {
        this.groups = this.coursesService.getGroups(val.id);
      }
    });
  }

  async deleteAssignment() {
    const result = await Swal.fire<Promise<boolean>>({
      title: this.transloco.translate('Wanna delete this assignment?'),
      text: this.transloco.translate(
        'This wont be reverse. The assignment and its recurrence will be erased as well'
      ),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#A0AEC0',
      confirmButtonColor: '#E53E3E',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Delete'),
    });
    if (result.value) {
      this.assignmentService.delete(this.assignment.id).subscribe(() => {
        Swal.fire(
          this.transloco.translate('Deleted itemf', {
            value: this.transloco.translate('Assignment'),
          }),
          '',
          'info'
        );
        this.modal.dismiss('deletion');
      });
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
