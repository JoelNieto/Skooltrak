import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
    CommonModule,
    TeachersRoutingModule,
    ProfileModule,
    ChangePasswordModule
  ]
})
export class TeachersModule { }
