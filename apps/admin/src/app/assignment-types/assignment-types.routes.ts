import { Routes } from '@angular/router';
import { assignments_types } from '@skooltrak-app/state';

export const ASSIGNMENT_TYPE_ROUTES: Routes = [
  {
    path: '',
    providers: [assignments_types.AssignmentTypesFacade],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./assignment-types.component').then(
            (c) => c.AssignmentTypesComponent
          ),
      },
    ],
  },
];
