import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users.routes';

@NgModule({
  declarations: [UsersComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomComponentsModule,
    TranslateModule.forChild(),
    UsersRoutingModule
  ]
})
export class UsersModule {}
