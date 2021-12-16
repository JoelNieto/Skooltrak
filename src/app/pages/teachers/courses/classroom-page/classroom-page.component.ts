import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/shared/models/classrooms.model';
import { ClassroomsService } from 'src/app/shared/services/classroom.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { environment } from 'src/environments/environment';

declare let JitsiMeetExternalAPI: any;
@Component({
  selector: 'skooltrak-classroom-page',
  templateUrl: './classroom-page.component.html',
  styleUrls: ['./classroom-page.component.sass'],
})
export class ClassroomPageComponent implements OnInit {
  title = 'app';
  options: any;
  api: any;
  room$: Observable<Classroom>;
  constructor(
    private session: SessionService,
    private route: ActivatedRoute,
    private roomsService: ClassroomsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.room$ = this.roomsService.get(params.id);
        this.options = {
          roomName: 'SK-' + params.id,
          width: 1100,
          height: 700,
          userInfo: {
            email: this.session.currentUser?.email,
            displayName: this.session.currentUser?.displayName,
          },
          parentNode: document.querySelector('#meet'),
        };

        this.api = new JitsiMeetExternalAPI(environment.meetURL, this.options);
      },
      (err) => console.error(err)
    );
  }
}
