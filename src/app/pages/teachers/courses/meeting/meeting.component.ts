import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { environment } from 'src/environments/environment';

declare let JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.sass'],
})
export class MeetingComponent implements OnInit, OnDestroy {
  @Input() course: Course;

  title = 'app';
  options: any;
  api: any;
  constructor(
    private session: SessionService,
    private signalR: SignalRService
  ) {
    this.signalR.hubConnection.stop().then(() => {});
    this.signalR.messageConnection.stop().then(() => {});
  }

  ngOnInit(): void {
    this.options = {
      roomName: 'SK-' + this.course.id,
      width: 1100,
      height: 700,
      userInfo: {
        email: this.session.currentUser?.email,
        displayName: this.session.currentUser?.displayName,
      },
      interfaceConfigOverWrite: {
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview'],
      },
      parentNode: document.querySelector('#meet'),
    };

    this.api = new JitsiMeetExternalAPI(environment.meetURL, this.options);
  }

  ngOnDestroy(): void {
    this.signalR.startForumConnection();
    this.signalR.startMessageConnection();
  }
}
