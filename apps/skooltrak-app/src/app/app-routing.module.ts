import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './shared/guards/admin.guard';
import { StudentGuard } from './shared/guards/student.guard';
import { TeacherGuard } from './shared/guards/teacher.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivateChild: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {}
  {
    path: 'teachers',
    canActivateChild: [TeacherGuard],
    loadChildren: () => import('./pages/teachers/teachers.module').then(m => m.TeachersModule)
  },
  {
    path: 'student',
    canActivateChild: [StudentGuard],
    loadChildren: () =>
      import('./pages/students/students.module').then(m => m.StudentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
