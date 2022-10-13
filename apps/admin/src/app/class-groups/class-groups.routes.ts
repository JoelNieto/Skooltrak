import { Routes } from '@angular/router';

export const CLASS_GROUPS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./class-groups.component').then((c) => c.ClassGroupsComponent),
  },
  {
    path: ':details',
    loadComponent: () =>
      import('./class-groups-details/class-groups-details.component').then(
        (c) => c.ClassGroupsDetailsComponent
      ),
  },
];
