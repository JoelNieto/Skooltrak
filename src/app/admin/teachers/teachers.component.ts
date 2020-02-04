import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/shared/models/students.model';
import { Teacher } from 'src/app/shared/models/teachers.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass']
})
export class TeachersComponent implements OnInit {
  teachers: Observable<Teacher[]>;
  table = new TableOptions();
  genders: Gender[] = [
    { id: 1, name: 'Femenino' },
    { id: 2, name: 'Masculino' }
  ];
  constructor(
    private teacherServ: TeachersService,
    private subjectsServ: SubjectsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.detailsURL = [];
    this.table.searcheable = true;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.instant('Name'),
        filterable: true,
        readonly: true
      },
      {
        name: 'firstName',
        title: this.translate.instant('First name'),
        required: true,
        hidden: true
      },
      {
        name: 'middleName',
        title: this.translate.instant('Middle name'),
        hidden: true
      },
      {
        name: 'surname',
        title: this.translate.instant('Surname'),
        hidden: true,
        required: true
      },
      {
        name: 'secondSurname',
        title: this.translate.instant('Second surname'),
        hidden: true
      },
      {
        name: 'email',
        title: this.translate.instant('Email'),
        required: true
      },
      {
        name: 'gender',
        title: this.translate.instant('Gender'),
        type: 'object',
        list: this.genders,
        hidden: true,
        required: true
      },
      {
        name: 'subjects',
        title: this.translate.instant('Subjects'),
        asyncList: this.subjectsServ.getAll(),
        type: 'array',
        objectText: 'name'
      },
      {
        name: 'birthDate',
        title: this.translate.instant('Date of birth'),
        type: 'date'
      },
      {
        name: 'createDate',
        title: this.translate.instant('Create date'),
        type: 'datetime',
        readonly: true
      }
    ];

    this.teachers = this.teacherServ.getAll();
  }

  createTeacher(teacher: Teacher) {
    this.teacherServ.create(teacher).subscribe(
      res => {
        swal.fire(
          res.name,
          this.translate.instant('Created item', {
            value: this.translate.instant('Teacher')
          }),
          'success'
        );
        this.teachers = this.teacherServ.getAll();
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }

  editTeacher(teacher: Teacher) {
    this.teacherServ.edit(teacher.id, teacher).subscribe(
      res => {
        this.teachers = this.teacherServ.getAll();
        swal.fire(
          teacher.name,
          this.translate.instant('Updated item', {
            value: this.translate.instant('Teacher')
          }),
          'success'
        );
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }

  deleteTeacher(id: string) {
    this.teacherServ.delete(id).subscribe(() => {
      swal.fire(
        this.translate.instant('Deleted item', {
          value: this.translate.instant('Teacher')
        }),
        '',
        'info'
      );
      this.teachers = this.teacherServ.getAll();
    });
  }

}
