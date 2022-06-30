import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomSelectModule, CustomTableModule } from '@skooltrak/custom-components';
import { EditorjsModule } from 'src/app/shared/components/editorjs/editorjs.module';

import { AssignmentTypesComponent } from './assignment-types/assignment-types.component';
import { CleaningModalComponent } from './cleaning-modal/cleaning-modal.component';
import { CleaningComponent } from './cleaning/cleaning.component';
import { DegreesComponent } from './degrees/degrees.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { PeriodsComponent } from './periods/periods.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routes';
import { SkillsComponent } from './skills/skills.component';
import { SubjectsComponent } from './subjects/subjects.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AssignmentTypesComponent,
    SubjectsComponent,
    DegreesComponent,
    SkillsComponent,
    PeriodsComponent,
    CleaningComponent,
    CleaningModalComponent,
    MessagesComponent,
    MessageDetailComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    CustomSelectModule,
    EditorjsModule,
    CustomTableModule,
    FormsModule,
    TranslocoModule,
    NgbModalModule,
  ],
})
export class SettingsModule {}