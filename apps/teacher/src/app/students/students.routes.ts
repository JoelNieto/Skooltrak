import { Routes } from '@angular/router';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./students.component').then((c) => c.StudentsComponent),
      },
      {
        path: 'details',
        loadComponent: () =>
          import('@skooltrak-app/ui').then((c) => c.StudentsDetailsComponent),
      },
    ],
  },
];
