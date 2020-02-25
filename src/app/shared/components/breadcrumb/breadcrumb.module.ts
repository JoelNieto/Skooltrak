import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { BreadcrumbComponent } from './breadcrumb.component';



@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
