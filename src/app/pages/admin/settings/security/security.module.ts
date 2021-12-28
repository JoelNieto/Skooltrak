import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomSelectModule, CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';

import { SecurityRoutingModule } from './security-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    SecurityRoutingModule,
    CustomTableModule,
    LoadingModalModule,
    CustomSelectModule,
  ],
})
export class SecurityModule {}
