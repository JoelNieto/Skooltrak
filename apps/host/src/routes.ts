import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { RoleEnum } from '@skooltrak-app/models';
import { auth } from '@skooltrak-app/state';
import { map } from 'rxjs';

const hasRole = (role: RoleEnum) =>
  inject(auth.AuthFacade).role$.pipe(map((current) => current === role));

export const routes: Routes = [
  {
    path: '',
    canMatch: [() => hasRole(RoleEnum.Admin)],
    loadChildren: () => import('admin/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    canMatch: [() => hasRole(RoleEnum.Teacher)],
    loadChildren: () =>
      import('teacher/Module').then((m) => m.RemoteEntryModule),
  },
];
