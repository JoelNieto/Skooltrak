import { Routes } from '@angular/router';
import { degrees as state } from '@skooltrak-app/state';

import { DegreesComponent } from './degrees.component';

export const DEGREES_ROUTES: Routes = [
  {
    path: '',
    providers: [state.DegreesFacade],
    children: [
      {
        path: '',
        component: DegreesComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./degrees-list/degrees-list.component').then(
                (c) => c.DegreesListComponent
              ),
          },
        ],
      },
    ],
  },
];
