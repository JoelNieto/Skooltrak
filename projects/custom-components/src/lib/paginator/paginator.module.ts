import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { PaginatorComponent } from './paginator.component';

@NgModule({
  imports: [CommonModule, TranslocoModule, FormsModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
