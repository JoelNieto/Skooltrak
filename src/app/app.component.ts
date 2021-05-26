import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { StorageEnum } from './shared/enums/storage.enum';
import { Student } from './shared/models/students.model';
import { Teacher } from './shared/models/teachers.model';
import { User } from './shared/models/users.model';
import { SessionService } from './shared/services/session.service';
import { StorageService } from './shared/services/storage.service';
import { UpdateService } from './shared/services/update.service';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'skooltrak-app';
  constructor(
    public update: UpdateService,
    private storage: StorageService,
    private session: SessionService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.storage.getFromStorage<User>(StorageEnum.User).subscribe((res) => {
      this.session.currentUser = res;
      if (res) {
        this.storage
          .getFromStorage(StorageEnum.CurrentStudent)
          .subscribe(
            (student: Student) => (this.session.currentStudent = student)
          );
        this.storage
          .getFromStorage(StorageEnum.CurrentTeacher)
          .subscribe(
            (teacher: Teacher) => (this.session.currentTeacher = teacher)
          );

        this.usersService.get(res.id).subscribe(
          (resp) => {
            if (
              (resp.updatedAt && resp.updatedAt > res.updatedAt) ||
              resp.blocked
            ) {
              this.router.navigate(['/']);
            } else {
              swal.fire({
                title: `Bienvenido(a) de nuevo, ${resp.displayName}`,
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false,
              });
            }
          },
          (err: Error) => {
            this.router.navigate(['/']);
          }
        );
      }
    });
  }
}
