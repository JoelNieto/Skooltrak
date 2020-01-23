import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { DetailsComponent } from './details/details.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    DetailsComponent,
    UsersFormComponent,
    NewUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    FormsModule,
    CustomComponentsModule
  ]
})
export class UsersModule {}