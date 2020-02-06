import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';

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
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CalendarModule,
    CustomComponentsModule,
    TeachersRoutingModule,
    ProfileModule,
    ChangePasswordModule
  ]
})
export class TeachersModule {}
