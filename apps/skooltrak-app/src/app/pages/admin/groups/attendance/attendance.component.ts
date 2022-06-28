import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { AttendanceSheet } from 'src/app/shared/models/attendance.model';
import { ClassGroup } from 'src/app/shared/models/studyplans.model';
import { AttendanceService } from 'src/app/shared/services/attendance.service';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import Swal from 'sweetalert2';

import { AttendanceFormComponent } from '../attendance-form/attendance-form.component';

@Component({
  selector: 'skooltrak-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.sass'],
})
export class AttendanceComponent implements OnInit {
  @Input() group: ClassGroup;
  table = new TableOptions();
  attendance$: Observable<AttendanceSheet[]>;

  constructor(
    private groupsService: ClassGroupsService,
    private transloco: TranslocoService,
    private attendanceService: AttendanceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.table.lookup = true;
    this.table.searchable = false;
    this.table.columns = [
      {
        name: 'period',
        title: this.transloco.translate('Period'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'group',
        title: this.transloco.translate('Group'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'teacher',
        title: this.transloco.translate('Teacher'),
        type: 'object',
        lookup: true,
      },
      {
        name: 'course',
        title: this.transloco.translate('Course'),
        type: 'object',
        objectText: 'course.subject.name',
        lookup: true,
      },
      { name: 'date', title: this.transloco.translate('Date'), type: 'date' },
    ];
    this.attendance$ = this.groupsService.getAttendance(this.group.id);
  }

  getSheet(sheet: AttendanceSheet) {
    const modalRef = this.modalService.open(AttendanceFormComponent, {
      size: 'lg',
    });
    modalRef.result.then(
      (result: AttendanceSheet) => {
        this.attendanceService.edit(result.id, result).subscribe({
          next: (res) => {
            Swal.fire(
              this.transloco.translate('Updated itemf', {
                value: this.transloco.translate('Attendance sheet'),
              }),
              '',
              'success'
            );
            this.attendance$ = this.groupsService.getAttendance(this.group.id);
          },
          error: (err) => console.error(err),
        });
      },
      () => {
        this.attendance$ = this.groupsService.getAttendance(this.group.id);
      }
    );
    modalRef.componentInstance.sheet = sheet;
  }
}
