import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Forum } from 'src/app/shared/models/forums.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.sass']
})
export class ForumsComponent implements OnInit {
  forums$: Observable<Forum[]>;

  constructor(
    private studentsService: StudentsService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.forums$ = this.studentsService.getForums(
      this.session.currentUser.people[0].id
    );
  }
}
