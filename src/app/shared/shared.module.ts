import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { AvatarPipe } from './pipes/avatar.pipe';

@NgModule({
  declarations: [TimeAgoPipe, AvatarPipe],
  exports: [TimeAgoPipe, AvatarPipe],
  imports: [CommonModule]
})
export class SharedModule {}
