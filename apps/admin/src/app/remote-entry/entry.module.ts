import { CommonModule } from '@angular/common';
import { importProvidersFrom, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from '../home/home.component';
import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('../admin.component').then((c) => c.AdminComponent),
        providers: [importProvidersFrom(TranslateModule)],
        children: [
          { path: 'home', component: HomeComponent },
          {
            path: 'messages',
            loadComponent: () =>
              import('@skooltrak-app/messaging').then(
                (m) => m.MessagingComponent
              ),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('../students/students.routes').then(
                (m) => m.STUDENTS_ROUTES
              ),
          },
          { path: '', pathMatch: 'full', redirectTo: 'home' },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
