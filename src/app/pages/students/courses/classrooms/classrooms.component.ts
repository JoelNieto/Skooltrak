import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/shared/models/classrooms.model';
import { ClassGroupsService } from 'src/app/shared/services/class-groups.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.sass'],
})
export class ClassroomsComponent implements OnInit {
  rooms$: Observable<Classroom[]>;
  constructor(
    private session: SessionService,
    private groupsService: ClassGroupsService
  ) {}

  ngOnInit(): void {
    this.rooms$ = this.groupsService.getRooms(
      this.session.currentStudent?.group?.id
    );
  }
}
