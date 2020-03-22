import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxSummernoteModule } from 'ngx-summernote';
import { BreadcrumbModule } from 'src/app/shared/components/breadcrumb/breadcrumb.module';
import { ChangePasswordModule } from 'src/app/shared/components/change-password/change-password.module';
import { ProfileModule } from 'src/app/shared/components/profile/profile.module';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { TopBarModule } from 'src/app/shared/components/top-bar/top-bar.module';

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
    TopBarModule,
    BreadcrumbModule,
    ProfileModule,
    ChangePasswordModule
  ]
})
export class AdminModule {}
