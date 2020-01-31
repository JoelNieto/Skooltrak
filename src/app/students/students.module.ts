import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';


@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    SidebarModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
