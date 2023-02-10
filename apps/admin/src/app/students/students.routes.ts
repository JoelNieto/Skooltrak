import { Routes } from '@angular/router';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./students.component').then((c) => c.StudentsComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./students-list/students-list.component').then(
            (c) => c.StudentsListComponent
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./students-new/students-new.component').then(
            (c) => c.StudentsNewComponent
          ),
      },
      {
        path: 'details',
        loadComponent: () =>
          import('@skooltrak-app/ui').then((c) => c.StudentsDetailsComponent),
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('./students-edit/students-edit.component').then(
            (c) => c.StudentsEditComponent
          ),
      },
    ],
  },
];
