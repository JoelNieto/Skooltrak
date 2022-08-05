import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';

import { StudentsComponent } from './students.component';

const routes: Routes = [
  {
    component: StudentsComponent,
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'assignments',
        loadChildren: () =>
          import('./assignments/assignments.module').then(
            (m) => m.AssignmentsModule
          ),
      },
      {
        path: 'grades',
        loadChildren: () =>
          import('./grades/grades.module').then((m) => m.GradesModule),
      },
      {
        path: 'exams',
        loadChildren: () =>
          import('./exams/exams.module').then((m) => m.ExamsModule),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./documents/documents.module').then((m) => m.DocumentsModule),
      },
      {
        path: 'forums',
        loadChildren: () =>
          import('./forums/forums.module').then((m) => m.ForumsModule),
      },
      {
        path: 'collection',
        loadChildren: () =>
          import('./collection/collection.module').then(
            (m) => m.CollectionModule
          ),
      },
      {
        path: 'messaging',
        loadChildren: () =>
          import('../../shared/components/messaging/messaging.module').then(
            (m) => m.MessagingModule
          ),
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
