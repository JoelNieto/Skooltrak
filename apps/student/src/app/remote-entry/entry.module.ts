import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from '@skooltrak-app/auth';
import { GradesComponent } from '../grades/grades.component';
import { HomeComponent } from '../home/home.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('../student.component').then((c) => c.StudentComponent),
        children: [
          { path: 'home', component: HomeComponent, title: 'Home' },
          {
            path: 'courses',
            loadChildren: () =>
              import('../courses/courses.routes').then((c) => c.COURSES_ROUTES),
            title: 'Courses',
          },
          {
            path: 'assignments',
            loadChildren: () =>
              import('../assignments/assignments.routes').then(
                (r) => r.ASSIGNMENTS_ROUTES
              ),
          },
          { path: 'grades', component: GradesComponent, title: 'Grades' },
          { path: 'profile', component: ProfileComponent, title: 'Profile' },
          { path: '', pathMatch: 'full', redirectTo: 'home' },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
