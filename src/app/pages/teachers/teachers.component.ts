import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass']
})
export class TeachersComponent implements OnInit {
  constructor(
    private signalR: SignalRService,
    public session: SessionService,
    public links: SidebarService
  ) {}

  ngOnInit() {
    this.signalR.startForumConnection();
  }
}
