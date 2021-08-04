import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/shared/models/announcements.model';
import { Summary } from 'src/app/shared/models/charges.model';
import { AnnouncementService } from 'src/app/shared/services/announcements.service';
import { ChargesService } from 'src/app/shared/services/charges.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  due$: Observable<Summary[]>;
  totalDue$: Observable<number>;
  count$: Observable<number>;
  totalCurrent$: Observable<number>;
  announcements$: Observable<Announcement[]>;
  constructor(
    public chargesService: ChargesService,
    public studentService: StudentsService,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.count$ = this.studentService.getCount();
    this.due$ = this.chargesService.getDue();
    this.totalDue$ = this.chargesService.getTotalDue();
    this.totalCurrent$ = this.chargesService.getTotalCurrent();
    this.announcements$ = this.announcementService.getAll();
  }
}
