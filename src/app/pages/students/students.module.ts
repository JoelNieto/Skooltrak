import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AssignmentDetailsModule } from 'src/app/shared/components/assignment-details/assignment-details.module';
import { BreadcrumbModule } from 'src/app/shared/components/breadcrumb/breadcrumb.module';
import { ChangePasswordModule } from 'src/app/shared/components/change-password/change-password.module';
import { NotificationsBarModule } from 'src/app/shared/components/notifications-bar/notifications-bar.module';
import { ProfileModule } from 'src/app/shared/components/profile/profile.module';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { SurveyFormModule } from 'src/app/shared/components/survey-form/survey-form.module';
import { TopBarModule } from 'src/app/shared/components/top-bar/top-bar.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    CalendarModule,
    BreadcrumbModule,
    SidebarModule,
    AssignmentDetailsModule,
    NgxSummernoteModule,
    NgbModalModule,
    NgbNavModule,
    TopBarModule,
    SharedModule,
    NotificationsBarModule,
    TranslocoModule,
    ProfileModule,
    ChangePasswordModule,
    CustomComponentsModule,
    StudentsRoutingModule,
    SurveyFormModule,
  ],
  providers: [DecimalPipe],
})
export class StudentsModule {}
