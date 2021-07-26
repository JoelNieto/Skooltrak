import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Course } from 'src/app/shared/models/studyplans.model';
import { User } from 'src/app/shared/models/users.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { environment } from 'src/environments/environment';

declare let JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.sass'],
})
export class MeetingComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() course: Course;

  @ViewChild('meet') meetContainer: ElementRef;
  title = 'app';
  options: any;
  api: any;
  currentUser: User;
  constructor(
    private session: SessionService,
    private signalR: SignalRService
  ) {
    this.signalR.hubConnection.stop().then(() => {});
    this.signalR.messageConnection.stop().then(() => {});
  }

  ngOnInit(): void {
    this.currentUser = this.session.currentUser;
  }

  ngAfterViewInit(): void {
    this.options = {
      roomName: 'SK-' + this.course.id,
      width: 1100,
      height: 700,
      userInfo: {
        email: this.currentUser?.email,
        displayName: this.currentUser?.displayName,
      },
      interfaceConfigOverWrite: {
        TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview'],
      },
      parentNode: this.meetContainer.nativeElement,
    };

    this.api = new JitsiMeetExternalAPI(environment.meetURL, this.options);
  }

  ngOnDestroy(): void {
    this.signalR.startForumConnection();
    this.signalR.startMessageConnection();
  }
}
