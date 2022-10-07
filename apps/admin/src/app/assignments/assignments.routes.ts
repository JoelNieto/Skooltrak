import { Routes } from '@angular/router';

export const ASSIGNMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./assignments.component').then((c) => c.AssignmentsComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./assignments-schedule/assignments-schedule.component').then(
            (c) => c.AssignmentsScheduleComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('@skooltrak-app/ui').then((c) => c.AssignmentDetailsComponent),
      },
    ],
  },
];
