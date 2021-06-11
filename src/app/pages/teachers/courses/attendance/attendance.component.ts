import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { add, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { AttendanceSheet } from 'src/app/shared/models/attendance.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import Swal from 'sweetalert2';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.sass'],
})
export class AttendanceComponent implements OnInit {
  @Input() course: Course;

  sheets$: Observable<AttendanceSheet[]>;
  table = new TableOptions();

  constructor(
    private coursesService: CoursesService,
    private transloco: TranslocoService,
    private attendanceService: AttendanceService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.table.searchable = false;
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'period',
        title: this.transloco.translate('Period'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'date',
        title: this.transloco.translate('Date'),
        type: 'date',
      },
    ];
    this.sheets$ = this.coursesService.getAttendance(this.course.id);
  }

  sheetDetails(sheet: AttendanceSheet) {
    const modalRef = this.modal.open(AttendanceFormComponent, { size: 'lg' });
    modalRef.result.then((result: AttendanceSheet) => {
      this.attendanceService.edit(result.id, result).subscribe(
        () => {
          Swal.fire(
            this.transloco.translate('Updated itemf', {
              value: this.transloco.translate('Attendance sheet'),
            }),
            '',
            'success'
          );
          this.sheets$ = this.coursesService.getAttendance(this.course.id);
        },
        (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            err.message,
            'error'
          );
        }
      );
    });
    modalRef.componentInstance.course = this.course;
    modalRef.componentInstance.currentSheet = sheet;
  }

  registerAttendance() {
    const modalRef = this.modal.open(AttendanceFormComponent, { size: 'lg' });
    modalRef.result.then((result: AttendanceSheet) => {
      this.attendanceService.create(result).subscribe(
        (res) => {
          Swal.fire(
            this.transloco.translate('Created itemf', {
              value: this.transloco.translate('Attendace sheet'),
            }),
            format(add(new Date(res.date), { hours: 6 }), 'iii d MMMM', {
              locale: es,
            }),
            'success'
          );
          this.sheets$ = this.coursesService.getAttendance(this.course.id);
        },
        (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            err.message,
            'error'
          );
        }
      );
    });
    modalRef.componentInstance.course = this.course;
  }

  deleteSheet(id: string) {
    this.attendanceService.delete(id).subscribe(
      () => {
        Swal.fire(
          this.transloco.translate('Deleted itemf', {
            value: this.transloco.translate('Attendance sheet'),
          }),
          '',
          'info'
        );
        this.sheets$ = this.coursesService.getAttendance(this.course.id);
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
}
