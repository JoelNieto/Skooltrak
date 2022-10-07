import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { COURSES_STATE, GROUPS_STATE } from './state-const';

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
        providers: [...COURSES_STATE, GROUPS_STATE],
        children: [
          {
            path: 'home',
            loadComponent: () =>
              import('../home/home.component').then((c) => c.HomeComponent),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('../students/students.routes').then(
                (r) => r.STUDENTS_ROUTES
              ),
          },
          {
            path: 'courses',
            loadChildren: () =>
              import('../courses/courses.routes').then((c) => c.COURSES_ROUTES),
          },
          {
            path: 'class-groups',
            loadChildren: () =>
              import('../groups/groups.routes').then((c) => c.GROUPS_ROUTES),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('@skooltrak-app/auth').then((c) => c.ProfileComponent),
          },
          {
            path: 'assignments',
            loadChildren: () =>
              import('../assignments/assignments.routes').then(
                (c) => c.ASSIGNMENTS_ROUTES
              ),
          },
          { path: '', pathMatch: 'full', redirectTo: 'home' },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
