import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { TIPPY_REF, TippyInstance } from '@ngneat/helipopper';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Student } from '../../models/students.model';
import { Teacher } from '../../models/teachers.model';
import { User } from '../../models/users.model';

@Component({
  selector: 'sk-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.html'],
})
export class ProfilePopoverComponent implements OnInit {
  @Input() user: User;
  profile$: Observable<Teacher | Student>;
  private url: string;

  constructor(
    @Inject(TIPPY_REF) tippy: TippyInstance,
    private http: HttpClient
  ) {
    this.url = environment.urlAPI + 'profiles/';
  }

  ngOnInit(): void {
    this.profile$ = this.http.get<Teacher | Student>(
      `${this.url}${this.user.id}`,
      { context: withCache() }
    );
  }
}
