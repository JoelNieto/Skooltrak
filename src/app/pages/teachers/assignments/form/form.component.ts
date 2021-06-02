import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Assignment, AssignmentType } from 'src/app/shared/models/assignments.model';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { AssignmentTypesService } from 'src/app/shared/services/assignmenttypes.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
})
export class FormComponent implements OnInit {
  @Input() assignment: Assignment;

  assignmentForm: FormGroup;
  courses$: Observable<Course[]>;
  groups$: Observable<ClassGroup[]>;
  types$: Observable<AssignmentType[]>;
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
    private session: SessionService,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private teacherService: TeachersService,
    private typesService: AssignmentTypesService
  ) {}

  ngOnInit(): void {
    this.types$ = this.typesService.getAll();
    this.courses$ = this.teacherService.getCourses(
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
      teacher: [
        this.assignment
          ? this.assignment.teacher
          : this.session.currentUser.people[0],
      ],
    });
    this.groups$ = this.coursesService.getGroups(this.assignment.course.id);
    this.assignmentForm.get('group').setValue(this.assignment.group);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
