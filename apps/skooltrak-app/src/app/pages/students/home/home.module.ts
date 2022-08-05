import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModalModule } from '@skooltrak/custom-components';
import { CalendarModule } from 'angular-calendar';
import { NgChartsModule } from 'ng2-charts';
import { AssignmentDetailsModule } from 'src/app/shared/components/assignment-details/assignment-details.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PerformanceComponent } from './performance/performance.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
  declarations: [
    HomeComponent,
    TimeTableComponent,
    ScheduleComponent,
    PerformanceComponent,
  ],
  imports: [
    CommonModule,
    AssignmentDetailsModule,
    HomeRoutingModule,
    TranslocoModule,
    NgChartsModule,
    NgbNavModule,
    NgbModalModule,
    CalendarModule,
    LoadingModalModule,
  ],
})
export class HomeModule {}
