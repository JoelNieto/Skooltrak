import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.sass']
})
export class MeetingsComponent implements OnInit, OnDestroy {
  @Input() course: Course;
  title = 'app';
  domain = 'meet.jit.si';
  options: any;
  api: any;
  constructor(private session: SessionService, private signalR: SignalRService) {
    this.signalR.hubConnection.stop().then(() => { });
    this.signalR.messageConnection.stop().then(() => { });
  }

  ngOnInit(): void {
    this.options = {
      roomName: 'SK-' +  this.course.id,
      width: 1100,
      height: 700,
      userInfo: {
        email: this.session.currentUser?.email,
        displayName: this.session.currentUser?.displayName,
      },
      parentNode: document.querySelector('#meet'),
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }

  ngOnDestroy(): void {
    this.signalR.startForumConnection();
    this.signalR.startMessageConnection();
  }

}
