import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';

import { AssignmentFormModule } from '../shared/components/assignment-form/assignment-form.module';
import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { ChangePasswordModule } from '../shared/components/change-password/change-password.module';
import { ProfileModule } from '../shared/components/profile/profile.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { HomeComponent } from './home/home.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';

@NgModule({
  declarations: [TeachersComponent, HomeComponent],
  imports: [
    SidebarModule,
    BreadcrumbModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarModule,
    CustomComponentsModule,
    TeachersRoutingModule,
    ProfileModule,
    ChangePasswordModule,
    AssignmentFormModule
  ]
})
export class TeachersModule {}
