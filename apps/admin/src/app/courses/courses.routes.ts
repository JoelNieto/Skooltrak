import { Routes } from '@angular/router';
import { courses } from '@skooltrak-app/state';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    providers: [courses.CoursesFacade],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./courses.component').then((c) => c.CoursesComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./courses-list/courses-list.component').then(
                (c) => c.CoursesListComponent
              ),
          },
          {
            path: 'details',
            loadComponent: () =>
              import('./courses-details/courses-details.component').then(
                (c) => c.CoursesDetailsComponent
              ),
          },
        ],
      },
    ],
  },
];
