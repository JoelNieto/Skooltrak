import { Routes } from '@angular/router';

export const CLASS_GROUPS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./class-groups.component').then((c) => c.ClassGroupsComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./class-groups-list/class-groups-list.component').then(
            (c) => c.ClassGroupsListComponent
          ),
      },
      {
        path: ':details',
        loadComponent: () =>
          import('./class-groups-details/class-groups-details.component').then(
            (c) => c.ClassGroupsDetailsComponent
          ),
      },
    ],
  },
];
