import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.sass']
})
export class AttendanceComponent implements OnInit {
  constructor(private modal: NgbModal) {}

  ngOnInit(): void {}

  public showAttendanceModal(): void {
    this.modal.open(AttendanceFormComponent, { size: 'lg' });
  }
}
