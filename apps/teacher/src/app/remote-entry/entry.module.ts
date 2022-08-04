import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('../teacher.component').then((c) => c.TeacherComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../home/home.component').then((c) => c.HomeComponent),
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
