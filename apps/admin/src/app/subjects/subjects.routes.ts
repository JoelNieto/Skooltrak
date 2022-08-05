import { Routes } from '@angular/router';
import { subjects as state } from '@skooltrak-app/state';

import { SubjectsComponent } from './subjects.component';

export const SUBJECTS_ROUTES: Routes = [
  {
    path: '',
    providers: [state.SubjectsFacade],
    children: [
      {
        path: '',
        component: SubjectsComponent,
        pathMatch: 'full',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./subjects-list/subjects-list.component').then(
                (c) => c.SubjectsListComponent
              ),
          },
        ],
      },
    ],
  },
];
