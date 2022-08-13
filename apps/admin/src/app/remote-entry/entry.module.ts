import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from '../home/home.component';
import {
  ASSIGNMENT_TYPE_STATE,
  CLASS_GROUPS_STATE,
  COURSES_STATE,
  DEGREES_STATE,
  PLANS_STATE,
  SCHOOLS_STATE,
  SUBJECTS_STATE,
  TEACHERS_STATE,
} from './state-const';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('../admin.component').then((c) => c.AdminComponent),
        providers: [
          ...PLANS_STATE,
          ...DEGREES_STATE,
          ...SCHOOLS_STATE,
          ...SUBJECTS_STATE,
          ...COURSES_STATE,
          ...TEACHERS_STATE,
          ...CLASS_GROUPS_STATE,
          ...ASSIGNMENT_TYPE_STATE,
        ],
        children: [
          { path: 'home', component: HomeComponent },
          {
            path: 'messages',
            loadComponent: () =>
              import('@skooltrak-app/messaging').then(
                (m) => m.MessagingComponent
              ),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('@skooltrak-app/auth').then((c) => c.ProfileComponent),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('../students/students.routes').then(
                (m) => m.STUDENTS_ROUTES
              ),
          },
          {
            path: 'schools',
            loadChildren: () =>
              import('../schools/schools.routes').then((m) => m.SCHOOLS_ROUTES),
          },
          {
            path: 'degrees',
            loadChildren: () =>
              import('../degrees/degrees.routes').then((r) => r.DEGREES_ROUTES),
          },
          {
            path: 'subjects',
            loadChildren: () =>
              import('../subjects/subjects.routes').then(
                (r) => r.SUBJECTS_ROUTES
              ),
          },
          {
            path: 'assignment-types',
            loadChildren: () =>
              import('../assignment-types/assignment-types.routes').then(
                (r) => r.ASSIGNMENT_TYPE_ROUTES
              ),
          },
          {
            path: 'plans',
            loadChildren: () =>
              import('../study-plans/study-plans.routes').then(
                (r) => r.PLANS_ROUTE
              ),
          },
          {
            path: 'courses',
            loadChildren: () =>
              import('../courses/courses.routes').then((r) => r.COURSES_ROUTES),
          },
          {
            path: 'teachers',
            loadChildren: () =>
              import('../teachers/teachers.routes').then(
                (r) => r.TEACHERS_ROUTES
              ),
          },
          {
            path: 'class-groups',
            loadChildren: () =>
              import('../class-groups/class-groups.routes').then(
                (r) => r.CLASS_GROUPS_ROUTES
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
