import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomTableModule, LoadingModalModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { DetailsComponent } from './details/details.component';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { PreviewMatchComponent } from './preview-match/preview-match.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    ExamsComponent,
    DetailsComponent,
    PreviewComponent,
    PreviewMatchComponent,
  ],
  imports: [
    CommonModule,
    ExamsRoutingModule,
    TranslocoModule,
    CustomTableModule,
    NgbNavModule,
    LoadingModalModule,
    DragDropModule,
    NgxSummernoteModule,
  ],
})
export class ExamsModule {}
