import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from 'custom-components';

import { AssignmentTypesComponent } from './assignment-types/assignment-types.component';
import { DegreesComponent } from './degrees/degrees.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routes';
import { SubjectsComponent } from './subjects/subjects.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AssignmentTypesComponent,
    SubjectsComponent,
    DegreesComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CustomComponentsModule,
    TranslateModule.forChild()
  ]
})
export class SettingsModule {}
