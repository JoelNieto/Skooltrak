import { Routes } from '@angular/router';
import { teachers } from '@skooltrak-app/state';

export const TEACHERS_ROUTES: Routes = [
  {
    path: '',
    providers: [teachers.TeachersFacade],
    loadComponent: () =>
      import('./teachers.component').then((x) => x.TeachersComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./teachers-list/teachers-list.component').then(
            (x) => x.TeachersListComponent
          ),
      },
      {
        path: 'details',
        loadComponent: () =>
          import('./teachers-details/teachers-details.component').then(
            (c) => c.TeachersDetailsComponent
          ),
      },
    ],
  },
];
