import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSummernoteModule } from 'ngx-summernote';

import { MessagingRoutingModule } from './messaging-routing.module';
import { MessagingComponent } from './messaging.component';
import { MessageComposeComponent } from './message-compose/message-compose.component';


@NgModule({
  declarations: [MessagingComponent, MessageComposeComponent],
  imports: [
    CommonModule,
    MessagingRoutingModule,
    NgxSummernoteModule
  ]
})
export class MessagingModule { }
