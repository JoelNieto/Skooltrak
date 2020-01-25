import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routes';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AdminComponent, HomeComponent],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    AdminRoutingModule,
    SidebarModule,
    BreadcrumbModule
  ]
})
export class AdminModule { }
