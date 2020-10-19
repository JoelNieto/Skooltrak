import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { NgxSummernoteModule } from 'ngx-summernote';

import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';
import { NewComponent } from './new/new.component';


@NgModule({
  declarations: [IncidentsComponent, DetailsComponent, NewComponent, FormComponent],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    CustomComponentsModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSummernoteModule
  ]
})
export class IncidentsModule { }
