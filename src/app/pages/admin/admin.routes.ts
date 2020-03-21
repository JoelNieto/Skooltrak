import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'collection',
        loadChildren: () =>
          import('./collection/collection.module').then(m => m.CollectionModule)
      },
      {
        path: 'announcements',
        loadChildren: () =>
          import('./announcements/announcements.module').then(
            m => m.AnnouncementsModule
          )
      },
      {
        path: 'teachers',
        loadChildren: () =>
          import('./teachers/teachers.module').then(m => m.TeachersModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'grades',
        loadChildren: () =>
          import('./grades/grades.module').then(m => m.GradesModule)
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups.module').then(m => m.GroupsModule)
      },
      {
        path: 'messaging',
        loadChildren: () =>
          import('./messaging/messaging.module').then(m => m.MessagingModule)
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'security',
        loadChildren: () =>
          import('./security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./students/students.module').then(m => m.StudentsModule)
      },
      { path: 'Teachers', redirectTo: 'teachers', pathMatch: 'full' },
      { path: 'Settings', redirectTo: 'settings', pathMatch: 'full' },
      { path: 'Courses', redirectTo: 'courses', pathMatch: 'full' },
      { path: 'Grades', redirectTo: 'grades', pathMatch: 'full' },
      { path: 'Groups', redirectTo: 'groups', pathMatch: 'full' },
      { path: 'Messaging', redirectTo: 'messaging', pathMatch: 'full' },
      { path: 'Security', redirectTo: 'security', pathMatch: 'full' },
      { path: 'Students', redirectTo: 'students', pathMatch: 'full' },
      { path: '', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule {}
