import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { FormComponent } from './form/form.component';
import { QuizesRoutingModule } from './quizes-routing.module';
import { QuizesComponent } from './quizes.component';

@NgModule({
  declarations: [QuizesComponent, FormComponent],
  imports: [
    CommonModule,
    QuizesRoutingModule,
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    CustomComponentsModule,
  ],
})
export class QuizesModule {}
