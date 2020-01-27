import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/shared/models/announcements.model';
import { Summary } from 'src/app/shared/models/charges.model';
import { AnnouncementService } from 'src/app/shared/services/announcements.service';
import { ChargesService } from 'src/app/shared/services/charges.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  due: Observable<Summary[]>;
  announcements: Observable<Announcement[]>;
  constructor(
    private chargesServ: ChargesService,
    private announcementServ: AnnouncementService
  ) {}

  ngOnInit() {
    this.due = this.chargesServ.getDue();
    this.announcements = this.announcementServ.getAll();
  }
}
