import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArrayPipe } from './array.pipe';
import { BooleanPipe } from './boolean.pipe';
import { ColumnPipe } from './column.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ArrayPipe, BooleanPipe, ColumnPipe],
  exports: [ArrayPipe, BooleanPipe, ColumnPipe],
})
export class PipesModule {}
