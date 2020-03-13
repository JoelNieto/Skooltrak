import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Assignment, AssignmentType } from '../../models/assignments.model';
import { Course, ClassGroup } from '../../models/studyplans.model';
import { AssignmentTypesService } from '../../services/assignmenttypes.service';
import { SessionService } from '../../services/session.service';
import { CoursesService } from '../../services/courses.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.sass']
})
export class AssignmentFormComponent implements OnInit {
  @Input() course: Course;
  assignmentForm: FormGroup;
  assignment: Assignment;
  courses: Observable<Course[]>;
  groups: Observable<ClassGroup[]>;
  types: Observable<AssignmentType[]>;
  minDate: NgbDateStruct = { year: new Date().getFullYear(), month: 3, day: 1 };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31
  };
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 100,
    minHeight: 100,
    uploadImagePath: '',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ]
  };
  constructor(
    public modal: NgbActiveModal,
    private coursesService: CoursesService,
    private teacherService: TeachersService,
    private typesService: AssignmentTypesService,
    private session: SessionService,
    private fb: FormBuilder
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
        [Validators.required]
      ],
      dueDate: [this.assignment ? this.assignment.dueDate : undefined],
      startDate: [
        this.assignment ? this.assignment.startDate : undefined,
        [Validators.required]
      ],
      description: [this.assignment ? this.assignment.description : '', []],
      type: [this.assignment ? this.assignment.type : undefined, [Validators.required]],
      course: [this.assignment ? this.assignment.course : undefined, []],
      group: [this.assignment ? this.assignment.group : undefined, []],
      teacher: [
        this.assignment
          ? this.assignment.teacher
          : this.session.currentUser.people[0]
      ]
    });
    if (!this.assignment?.type) {
      this.assignmentForm.get('type').setValue(undefined);
    }
    if (!this.assignment?.course) {
      if (this.course) {
        this.assignmentForm.get('course').setValue(this.course);
        this.groups = this.coursesService.getGroups(this.course.id);
      } else {
        this.assignmentForm.get('course').setValue(undefined);
      }
    }
    this.onChanges();
  }

  onChanges(): void {
    this.assignmentForm.get('course').valueChanges.subscribe((val: Course) => {
      if (val?.id) {
        this.groups = this.coursesService.getGroups(val.id);
      }
      this.assignmentForm.get('group').setValue(undefined);
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
