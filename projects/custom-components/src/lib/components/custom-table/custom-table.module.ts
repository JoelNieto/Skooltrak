import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';

import { PipesModule } from '../../pipes/pipes.module';
import { CustomFormModule } from '../custom-form/custom-form.module';
import { LoadingModalModule } from '../loading-modal/loading-modal.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { CustomTableComponent } from './custom-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingModalModule,
    TranslocoModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbModalModule,
    CustomFormModule,
    PipesModule,
    PaginatorModule,
  ],
  declarations: [CustomTableComponent],
  exports: [CustomTableComponent],
})
export class CustomTableModule {}
