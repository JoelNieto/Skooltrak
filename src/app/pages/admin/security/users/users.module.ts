import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomTableModule } from '@skooltrak/custom-components';

import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, UsersFormComponent, EditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    CustomTableModule,
  ],
})
export class UsersModule {}
