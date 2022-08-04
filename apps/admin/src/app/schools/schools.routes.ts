import { Routes } from '@angular/router';
import { schools as state } from '@skooltrak-app/state';

import { SchoolsComponent } from './schools.component';

export const SCHOOLS_ROUTES: Routes = [
  {
    path: '',
    providers: [state.SchoolsFacade],
    children: [
      {
        path: '',
        component: SchoolsComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./schools-list/schools-list.component').then(
                (c) => c.SchoolsListComponent
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./schools-new/schools-new.component').then(
                (c) => c.SchoolsNewComponent
              ),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./schools-edit/schools-edit.component').then(
                (c) => c.SchoolsEditComponent
              ),
          },
        ],
      },
    ],
  },
];
