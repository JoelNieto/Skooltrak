import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxSummernoteModule } from 'ngx-summernote';

import { MessageComposeComponent } from './message-compose/message-compose.component';
import { MessagingRoutingModule } from './messaging-routing.module';
import { MessagingComponent } from './messaging.component';


@NgModule({
  declarations: [MessagingComponent, MessageComposeComponent],
  imports: [
    CommonModule,
    MessagingRoutingModule,
    NgxSummernoteModule,
    TranslocoModule
  ]
})
export class MessagingModule { }
