import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbModalModule,
  NgbNavModule,
  NgbProgressbarModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { SharedModule } from '../../shared.module';
import { ComposeComponent } from './compose/compose.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DetailsComponent } from './details/details.component';
import { DraftComponent } from './draft/draft.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessagingRoutingModule } from './messaging-routing.module';
import { MessagingComponent } from './messaging.component';
import { OutboxComponent } from './outbox/outbox.component';
import { TrashComponent } from './trash/trash.component';
import { MessagePageComponent } from './message-page/message-page.component';

@NgModule({
  declarations: [
    MessagingComponent,
    InboxComponent,
    OutboxComponent,
    DraftComponent,
    TrashComponent,
    ContactsComponent,
    ComposeComponent,
    DetailsComponent,
    MessagePageComponent
  ],
  imports: [
    CommonModule,
    MessagingRoutingModule,
    NgbNavModule,
    CustomComponentsModule,
    NgbModalModule,
    SharedModule,
    FormsModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgxSummernoteModule
  ]
})
export class MessagingModule {}
