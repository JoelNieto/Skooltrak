import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Student } from '../../models/students.model';
import { Teacher } from '../../models/teachers.model';
import { User } from '../../models/users.model';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'skooltrak-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.sass'],
})
export class ProfilePopoverComponent implements OnInit {
  @Input() user: User;
  profile$: Observable<Teacher | Student | any>;
  role: string;
  private url: string;

  constructor(private http: HttpClient, private file: FilesService) {
    this.url = environment.urlAPI + 'profiles/';
  }

  ngOnInit(): void {
    this.profile$ = this.http.get<Teacher | Student>(
      `${this.url}${this.user.id}`,
      { context: withCache() }
    );
  }

  getAvatar() {
    const photo = this.user.photoURL;
    if (photo) {
      if (this.isValidURL(photo)) {
        return photo;
      } else {
        return this.file.getFile(photo);
      }
    } else {
      return 'assets/img/default-avatar.png';
    }
  }

  isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
}
