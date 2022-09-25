import { Routes } from '@angular/router';
import { teacher_groups } from '@skooltrak-app/state';

export const GROUPS_ROUTES: Routes = [
  {
    path: '',
    providers: [teacher_groups.GroupsFacade],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./groups.component').then((c) => c.GroupsComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./groups-list/groups-list.component').then(
                (c) => c.GroupsListComponent
              ),
          },
          {
            path: 'details',
            loadComponent: () =>
              import('./groups-details/groups-details.component').then(
                (c) => c.GroupsDetailsComponent
              ),
          },
        ],
      },
    ],
  },
];
