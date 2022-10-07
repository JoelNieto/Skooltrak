import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from '@skooltrak-app/models';
import { auth } from '@skooltrak-app/state';
import { filter } from 'rxjs';

@Component({
  selector: 'skooltrak-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _auth: auth.AuthFacade, private router: Router) {}

  ngOnInit(): void {
    this._auth.loadUserInfo();
    this._auth.role$.pipe(filter((role) => !!role)).subscribe({
      next: (role) => {
        switch (role) {
          case RoleEnum.Admin: {
            this.router.resetConfig([
              {
                path: '',
                loadChildren: () =>
                  import('admin/Module').then((m) => m.RemoteEntryModule),
              },
            ]);
            break;
          }
          case RoleEnum.Teacher: {
            this.router.resetConfig([
              {
                path: '',
                loadChildren: () =>
                  import('teacher/Module').then((m) => m.RemoteEntryModule),
              },
            ]);
            break;
          }
        }
        this.router.navigate(['']);
      },
    });

    this._auth.logged$.pipe(filter((logged) => !logged)).subscribe({
      next: () => {
        this.router.resetConfig([
          {
            path: 'auth',
            loadChildren: () =>
              import('@skooltrak-app/auth').then((m) => m.AUTH_ROUTES),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'auth',
          },
        ]);
      },
    });
  }
}
