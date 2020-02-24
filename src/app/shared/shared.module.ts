import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [TimeAgoPipe],
  exports: [TimeAgoPipe],
  imports: [CommonModule]
})
export class SharedModule {}
