import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSummernoteModule } from 'ngx-summernote';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { ProfileModule } from '../shared/components/profile/profile.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routes';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AdminComponent, HomeComponent],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    NgxSummernoteModule,
    AdminRoutingModule,
    SidebarModule,
    BreadcrumbModule,
    ProfileModule
  ]
})
export class AdminModule {}
