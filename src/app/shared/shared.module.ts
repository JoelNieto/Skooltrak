import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarPipe } from './pipes/avatar.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TimeMessagePipe } from './pipes/time-message.pipe';
import { TimeStampPipe } from './pipes/timestamp.pipe';

@NgModule({
  declarations: [
    TimeAgoPipe,
    AvatarPipe,
    TimeMessagePipe,
    CustomDatePipe,
    TimeStampPipe,
  ],
  exports: [
    TimeAgoPipe,
    AvatarPipe,
    TimeMessagePipe,
    CustomDatePipe,
    TimeStampPipe,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
