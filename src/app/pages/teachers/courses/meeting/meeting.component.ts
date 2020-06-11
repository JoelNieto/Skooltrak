import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/studyplans.model';
import { SessionService } from 'src/app/shared/services/session.service';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.sass']
})
export class MeetingComponent implements OnInit {
  @Input() course: Course;

  title = 'app';
  domain = 'meet.jit.si';
  options: any;
  api: any;
  constructor( private session: SessionService,) { }

  ngOnInit(): void {
    this.options = {
      roomName: 'SK-' +  this.course.id,
      width: 700,
      height: 700,
      userInfo: {
        email: this.session.currentUser?.email,
        displayName: this.session.currentUser?.displayName,
      },
      parentNode: document.querySelector('#meet'),
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }

}
