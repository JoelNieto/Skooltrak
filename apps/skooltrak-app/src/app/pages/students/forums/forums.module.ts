import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModalModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';
import { DocumentsFormModule } from 'src/app/shared/components/documents-form/documents-form.module';
import { AvatarPipe } from 'src/app/shared/pipes/avatar.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChatComponent } from './chat/chat.component';
import { DocumentsComponent } from './documents/documents.component';
import { ForumsPageComponent } from './forums-page/forums-page.component';
import { ForumsRoutingModule } from './forums-routing.module';
import { ForumsComponent } from './forums.component';

@NgModule({
  declarations: [
    ForumsComponent,
    ForumsPageComponent,
    ChatComponent,
    DocumentsComponent,
  ],
  imports: [
    CommonModule,
    ForumsRoutingModule,
    SharedModule,
    NgbNavModule,
    FormsModule,
    NgbTooltipModule,
    NgbModalModule,
    DocumentsFormModule,
    NgxSummernoteModule,
    LoadingModalModule,
    TranslocoModule,
  ],
  providers: [AvatarPipe],
})
export class ForumsModule {}
