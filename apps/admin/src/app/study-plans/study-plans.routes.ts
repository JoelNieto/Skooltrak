import { Routes } from '@angular/router';
import { plans as state } from '@skooltrak-app/state';

export const PLANS_ROUTE: Routes = [
  {
    path: '',
    providers: [state.StudyPlansFacade],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./study-plans.component').then((c) => c.StudyPlansComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./study-plans-list/study-plans-list.component').then(
                (c) => c.StudyPlansListComponent
              ),
          },
        ],
      },
    ],
  },
];
