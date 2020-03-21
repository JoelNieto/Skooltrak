import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students.component';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    component: StudentsComponent,
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
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
        path: 'forums',
        loadChildren: () =>
          import('./forums/forums.module').then(m => m.ForumsModule)
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
