import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, Course } from 'src/app/shared/models/studyplans.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-temporary',
  templateUrl: './temporary.component.html',
  styleUrls: ['./temporary.component.sass'],
})
export class TemporaryComponent implements OnInit {
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;
  groups$: Observable<ClassGroup[]>;
  table = new TableOptions();
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private groupsService: ClassGroupsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.groups$ = this.groupsService.getAll();
    this.courses$ = this.coursesService.getAll();
    this.table.columns = [
      {
        name: 'fullName',
        title: this.transloco.translate('Name'),
        readonly: true,
        filterable: true,
      },
      {
        name: 'firstName',
        title: this.transloco.translate('First name'),
        hidden: true,
        required: true,
      },
      {
        name: 'middleName',
        title: this.transloco.translate('Middle name'),
        hidden: true,
      },
      {
        name: 'surname',
        title: this.transloco.translate('Surname'),
        hidden: true,
        required: true,
      },
      {
        name: 'secondSurname',
        title: this.transloco.translate('Second surname'),
        hidden: true,
      },
      {
        name: 'email',
        title: this.transloco.translate('Email'),
        required: true,
        type: 'email',
      },
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        required: true,
        type: 'object',
        asyncList: this.groups$,
      },
      {
        name: 'courses',
        title: this.transloco.translate('Courses'),
        required: true,
        type: 'array',
        asyncList: this.courses$,
        objectText: 'name',
      },
      {
        name: 'notes',
        title: this.transloco.translate('Comments'),
        type: 'text',
        hidden: true,
      },
    ];
    this.students$ = this.studentsService.getTemporary();
  }

  createStudent(student: Student) {
    student.temporary = true;
    this.studentsService.create(student).subscribe(
      (res) => {
        Swal.fire(
          res.name,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('Student'),
          }),
          'success'
        );
        this.students$ = this.studentsService.getTemporary();
      },
      (err: HttpErrorResponse) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.error),
          'error'
        );
      }
    );
  }

  updateStudent(student: Student) {
    this.studentsService.edit(student.id, student).subscribe(
      () => {
        Swal.fire(
          student.name,
          this.transloco.translate('Updated item', {
            value: this.transloco.translate('Student'),
          }),
          'success'
        );
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          err.message,
          'error'
        );
      }
    );
  }

  deleteStudent(id: string) {
    this.studentsService.delete(id).subscribe(
      () => {
        Swal.fire(
          '',
          this.transloco.translate('Deleted item', {
            value: this.transloco.translate('Student'),
          }),
          'info'
        );
        this.students$ = this.studentsService.getTemporary();
      },
      (err: Error) =>
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          err.message,
          'error'
        )
    );
  }
}
