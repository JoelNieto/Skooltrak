import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessComponent } from './access/access.component';
import { RolesComponent } from './roles/roles.component';
import { SecurityComponent } from './security.component';

const routes: Routes = [
  { path: '', component: SecurityComponent },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'access',
    component: AccessComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
