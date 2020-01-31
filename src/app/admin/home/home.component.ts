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
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  due: Observable<Summary[]>;
  totalDue: Observable<number>;
  count: Observable<number>;
  totalCurrent: Observable<number>;
  announcements: Observable<Announcement[]>;
  constructor(
    public chargesServ: ChargesService,
    public studentServ: StudentsService,
    private announcementServ: AnnouncementService
  ) {}

  ngOnInit() {
    this.count = this.studentServ.getCount();
    this.due = this.chargesServ.getDue();
    this.totalDue = this.chargesServ.getTotalDue();
    this.totalCurrent = this.chargesServ.getTotalCurrent();
    this.announcements = this.announcementServ.getAll();
  }
}
