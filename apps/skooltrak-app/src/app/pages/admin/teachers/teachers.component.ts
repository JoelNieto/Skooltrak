import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/shared/models/students.model';
import { Teacher } from 'src/app/shared/models/teachers.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass'],
})
export class TeachersComponent implements OnInit {
  teachers$: Observable<Teacher[]>;
  table = new TableOptions();
  genders: Gender[] = [
    { id: 1, name: 'Femenino' },
    { id: 2, name: 'Masculino' },
  ];
  constructor(
    private teacherServ: TeachersService,
    private subjectsServ: SubjectsService,
    private translate: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.detailsURL = [];
    this.table.modalSize = 'lg';
    this.table.searchable = true;
    this.table.columns = [
      {
        name: 'name',
        title: this.translate.translate('Name'),
        filterable: true,
        readonly: true,
      },
      {
        name: 'firstName',
        title: this.translate.translate('First name'),
        required: true,
        hidden: true,
      },
      {
        name: 'middleName',
        title: this.translate.translate('Middle name'),
        hidden: true,
      },
      {
        name: 'surname',
        title: this.translate.translate('Surname'),
        hidden: true,
        required: true,
      },
      {
        name: 'secondSurname',
        title: this.translate.translate('Second surname'),
        hidden: true,
      },
      {
        name: 'email',
        title: this.translate.translate('Email'),
        required: true,
        type: 'email',
      },
      {
        name: 'mobilePhone',
        title: this.translate.translate('Phone number'),
        type: 'mobile-phone',
      },
      {
        name: 'gender',
        title: this.translate.translate('Gender'),
        type: 'object',
        list: this.genders,
        hidden: true,
        required: true,
      },
      {
        name: 'subjects',
        title: this.translate.translate('Subjects'),
        asyncList: this.subjectsServ.getAll(),
        type: 'array',
        objectText: 'name',
      },
      {
        name: 'birthDate',
        title: this.translate.translate('Date of birth'),
        type: 'date',
      },
      {
        name: 'createDate',
        title: this.translate.translate('Create date'),
        type: 'datetime',
        readonly: true,
      },
    ];

    this.teachers$ = this.teacherServ.getAll();
  }

  createTeacher(teacher: Teacher) {
    this.teacherServ.create(teacher).subscribe({
      next: (res) => {
        swal.fire(
          res.name,
          this.translate.translate('Created item', {
            value: this.translate.translate('Teacher'),
          }),
          'success'
        );
        this.teachers$ = this.teacherServ.getAll();
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }

  editTeacher(teacher: Teacher) {
    this.teacherServ.edit(teacher.id, teacher).subscribe({
      next: (res) => {
        this.teachers$ = this.teacherServ.getAll();
        swal.fire(
          teacher.name,
          this.translate.translate('Updated item', {
            value: this.translate.translate('Teacher'),
          }),
          'success'
        );
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }

  deleteTeacher(id: string) {
    this.teacherServ.delete(id).subscribe({
      next: () => {
        swal.fire(
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Teacher'),
          }),
          '',
          'info'
        );
        this.teachers$ = this.teacherServ.getAll();
      },
      error: (err) => console.error(err),
    });
  }
}