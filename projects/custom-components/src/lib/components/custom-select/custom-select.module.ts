import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { PipesModule } from '../../pipes/pipes.module';
import { CustomSelectComponent } from './custom-select.component';

@NgModule({
  imports: [CommonModule, FormsModule, TranslocoModule, PipesModule],
  declarations: [CustomSelectComponent],
  exports: [CustomSelectComponent],
})
export class CustomSelectModule {}
