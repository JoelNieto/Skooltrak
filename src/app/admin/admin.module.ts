import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routes';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [AdminComponent, HomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarModule,
    BreadcrumbModule
  ]
})
export class AdminModule { }
