import { Routes } from '@angular/router';
import { class_groups } from '@skooltrak-app/state';

export const CLASS_GROUPS_ROUTES: Routes = [
  {
    path: '',
    providers: [class_groups.ClassGroupsFacade],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./class-groups.component').then(
            (c) => c.ClassGroupsComponent
          ),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./class-groups-lists/class-groups-lists.component').then(
                (x) => x.ClassGroupsListsComponent
              ),
          },
        ],
      },
    ],
  },
];
