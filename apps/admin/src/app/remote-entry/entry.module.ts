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
          { path: 'home', component: HomeComponent, title: 'Home' },
          {
            path: 'settings',
            title: 'Settings',
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
            title: 'Profile',
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
            title: 'Students',
            loadChildren: () =>
              import('../students/students.routes').then(
                (m) => m.STUDENTS_ROUTES
              ),
          },
          {
            path: 'schools',
            title: 'Schools',
            loadChildren: () =>
              import('../schools/schools.routes').then((m) => m.SCHOOLS_ROUTES),
          },
          {
            path: 'subjects',
            title: 'Subjects',
            loadComponent: () =>
              import('../subjects/subjects.component').then(
                (r) => r.SubjectsComponent
              ),
          },
          {
            path: 'plans',
            title: 'Plans',
            loadComponent: () =>
              import('../study-plans/study-plans.component').then(
                (r) => r.StudyPlansComponent
              ),
          },
          {
            path: 'courses',
            title: 'Courses',
            loadChildren: () =>
              import('../courses/courses.routes').then((r) => r.COURSES_ROUTES),
          },
          {
            path: 'teachers',
            title: 'Teachers',
            loadChildren: () =>
              import('../teachers/teachers.routes').then(
                (r) => r.TEACHERS_ROUTES
              ),
          },
          {
            path: 'class-groups',
            title: 'Groups',
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
