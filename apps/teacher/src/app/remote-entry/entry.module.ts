import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { COURSES_STATE } from './state-const';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('../teacher.component').then((c) => c.TeacherComponent),
        providers: [...COURSES_STATE],
        children: [
          {
            path: 'home',
            loadComponent: () =>
              import('../home/home.component').then((c) => c.HomeComponent),
          },
          {
            path: 'courses',
            loadChildren: () =>
              import('../courses/courses.routes').then((c) => c.COURSES_ROUTES),
          },
          {
            path: 'class-groups',
            loadComponent: () =>
              import('../groups/groups.component').then(
                (c) => c.GroupsComponent
              ),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('@skooltrak-app/auth').then((c) => c.ProfileComponent),
          },
          { path: '', pathMatch: 'full', redirectTo: 'home' },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
