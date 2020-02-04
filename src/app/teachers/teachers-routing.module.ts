import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { TeachersComponent } from './teachers.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'quizes',
        loadChildren: () =>
          import('./quizes/quizes.module').then(m => m.QuizesModule)
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
export class TeachersRoutingModule {}
