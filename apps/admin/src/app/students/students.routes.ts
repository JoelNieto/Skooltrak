import { Routes } from '@angular/router';

import { StudentsComponent } from './students.component';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    component: StudentsComponent,
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
