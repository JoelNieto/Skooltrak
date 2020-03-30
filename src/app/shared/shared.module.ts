import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarPipe } from './pipes/avatar.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TimeMessagePipe } from './pipes/time-message.pipe';

@NgModule({
  declarations: [TimeAgoPipe, AvatarPipe, TimeMessagePipe],
  exports: [TimeAgoPipe, AvatarPipe, TimeMessagePipe],
  imports: [CommonModule]
})
export class SharedModule {}
