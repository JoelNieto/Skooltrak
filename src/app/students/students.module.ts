import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';

import { AssignmentDetailsModule } from '../shared/components/assignment-details/assignment-details.module';
import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { ChangePasswordModule } from '../shared/components/change-password/change-password.module';
import { ProfileModule } from '../shared/components/profile/profile.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { HomeComponent } from './home/home.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [StudentsComponent, HomeComponent],
  imports: [
    CommonModule,
    CalendarModule,
    BreadcrumbModule,
    SidebarModule,
    AssignmentDetailsModule,
    NgbModalModule,
    NgbNavModule,
    TranslocoModule,
    ProfileModule,
    ChangePasswordModule,
    CustomComponentsModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule {}
