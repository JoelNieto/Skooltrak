import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { AnnouncementsComponent } from './announcements.component';
import { AnnouncementsRoutingModule } from './announcements.routes';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [AnnouncementsComponent, NewAnnouncementComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AnnouncementsRoutingModule,
    CustomComponentsModule,
    NgxSummernoteModule,
    TranslocoModule
  ]
})
export class AnnouncementsModule { }
