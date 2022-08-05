import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Forum } from 'src/app/shared/models/forums.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'skooltrak-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        query('.forum', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(30, animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
        ]),
      ]),
    ]),
  ],
})
export class ForumsComponent implements OnInit {
  forums$: Observable<Forum[]>;

  constructor(
    private teachersService: TeachersService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.forums$ = this.teachersService.getForums(
      this.session.currentUser.people[0].id
    );
  }
}
