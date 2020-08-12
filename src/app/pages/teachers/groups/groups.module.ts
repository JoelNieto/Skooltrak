import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [GroupsComponent, DetailsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    CustomComponentsModule,
    TranslocoModule
  ]
})
export class GroupsModule { }
