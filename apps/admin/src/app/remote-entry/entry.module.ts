import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from '../home/home.component';
import { SCHOOLS_STATE } from './state-const';

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
        providers: [...SCHOOLS_STATE],
        children: [
          { path: 'home', component: HomeComponent },
          {
            path: 'settings',
            loadChildren: () =>
              import('../settings/settings.routes').then(
                (c) => c.SETTINGS_ROUTES
              ),
          },
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
            path: 'assignments',
            loadChildren: () =>
              import('../assignments/assignments.routes').then(
                (m) => m.ASSIGNMENTS_ROUTES
              ),
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
            path: 'subjects',
            loadComponent: () =>
              import('../subjects/subjects.component').then(
                (r) => r.SubjectsComponent
              ),
          },
          {
            path: 'plans',
            loadComponent: () =>
              import('../study-plans/study-plans.component').then(
                (r) => r.StudyPlansComponent
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
