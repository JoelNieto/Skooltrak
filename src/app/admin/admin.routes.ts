import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      {
        path: 'Collection',
        loadChildren: () =>
          import('./collection/collection.module').then(m => m.CollectionModule)
      },
      {
        path: 'Teachers',
        loadChildren: () =>
          import('./teachers/teachers.module').then(m => m.TeachersModule)
      },
      {
        path: 'Settings',
        loadChildren: () =>
          import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'Schools',
        loadChildren: () =>
          import('./schools/schools.module').then(m => m.SchoolsModule)
      },
      {
        path: 'Courses',
        loadChildren: () =>
          import('./courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'Grades',
        loadChildren: () =>
          import('./grades/grades.module').then(m => m.GradesModule)
      },
      {
        path: 'Groups',
        loadChildren: () =>
          import('./groups/groups.module').then(m => m.GroupsModule)
      },
      {
        path: 'Messaging',
        loadChildren: () =>
          import('./messaging/messaging.module').then(m => m.MessagingModule)
      },
      {
        path: 'Security',
        loadChildren: () =>
          import('./security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'Students',
        loadChildren: () =>
          import('./students/students.module').then(m => m.StudentsModule)
      },
      { path: 'teachers', redirectTo: 'Teachers', pathMatch: 'full' },
      { path: 'settings', redirectTo: 'Settings', pathMatch: 'full' },
      { path: 'courses', redirectTo: 'Courses', pathMatch: 'full' },
      { path: 'grades', redirectTo: 'Grades', pathMatch: 'full' },
      { path: 'groups', redirectTo: 'Groups', pathMatch: 'full' },
      { path: 'messaging', redirectTo: 'Messaging', pathMatch: 'full' },
      { path: 'security', redirectTo: 'Security', pathMatch: 'full' },
      { path: 'students', redirectTo: 'Students', pathMatch: 'full' },
      { path: '', redirectTo: 'Home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule {}
