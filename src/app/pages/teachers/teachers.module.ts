import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AssignmentFormModule } from 'src/app/shared/components/assignment-form/assignment-form.module';
import { BreadcrumbModule } from 'src/app/shared/components/breadcrumb/breadcrumb.module';
import { ChangePasswordModule } from 'src/app/shared/components/change-password/change-password.module';
import { ProfileModule } from 'src/app/shared/components/profile/profile.module';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';

import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home/home.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';


@NgModule({
  declarations: [TeachersComponent, HomeComponent, DocumentsComponent],
  imports: [
    SidebarModule,
    BreadcrumbModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    CalendarModule,
    NgxSummernoteModule,
    CustomComponentsModule,
    TeachersRoutingModule,
    ProfileModule,
    ChangePasswordModule,
    AssignmentFormModule
  ]
})
export class TeachersModule {}