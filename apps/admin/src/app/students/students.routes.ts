import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { admin_students as state } from '@skooltrak-app/state';

import { StudentsComponent } from './students.component';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    providers: [
      state.StudentsFacade,
      state.StudentsService,
      TranslateModule,
      importProvidersFrom(
        StoreModule.forFeature(state.studentsFeatureKey, state.reducer),
        EffectsModule.forFeature([state.StudentsEffects])
      ),
    ],
    children: [
      {
        path: '',
        component: StudentsComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./students-list/students-list.component').then(
                (c) => c.StudentsListComponent
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./students-new/students-new.component').then(
                (c) => c.StudentsNewComponent
              ),
          },

          {
            path: 'edit',
            loadComponent: () =>
              import('./students-edit/students-edit.component').then(
                (c) => c.StudentsEditComponent
              ),
          },
        ],
      },
    ],
  },
];
