import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { add, format } from 'date-fns';
import { AttendanceEnum } from 'src/app/shared/enums/attendance.enum';
import { AttendanceSheet } from 'src/app/shared/models/attendance.model';

@Component({
  selector: 'skooltrak-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.sass'],
})
export class AttendanceFormComponent {
  @Input() sheet: AttendanceSheet;
  options = AttendanceEnum.ATTENDANCE_OPTIONS_LIST;
  constructor(public modal: NgbActiveModal) {}

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  formatDate(date: Date): string {
    return format(add(new Date(date), { days: 1 }), 'dd-MM-yyyy');
  }
}
