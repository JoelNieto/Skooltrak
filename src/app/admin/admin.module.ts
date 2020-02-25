import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxSummernoteModule } from 'ngx-summernote';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { ChangePasswordModule } from '../shared/components/change-password/change-password.module';
import { ProfileModule } from '../shared/components/profile/profile.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routes';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AdminComponent, HomeComponent],
  imports: [
    TranslocoModule,
    CommonModule,
    NgxSummernoteModule,
    AdminRoutingModule,
    SidebarModule,
    BreadcrumbModule,
    ProfileModule,
    ChangePasswordModule
  ]
})
export class AdminModule {}
