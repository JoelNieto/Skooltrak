import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModalModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormComponent } from './form/form.component';
import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent } from './quizes.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [QuizesComponent, FormComponent, ResultsComponent],
  imports: [
    CommonModule,
    QuizesRoutingModule,
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    NgbModalModule,
    LoadingModalModule,
    NgxSummernoteModule,
    SharedModule,
  ],
})
export class QuizesModule {}
