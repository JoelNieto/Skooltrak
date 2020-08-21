import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarPipe } from './pipes/avatar.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TimeMessagePipe } from './pipes/time-message.pipe';
import { TimeStampPipe } from './pipes/timestamp.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    TimeAgoPipe,
    AvatarPipe,
    TimeMessagePipe,
    CustomDatePipe,
    TimeStampPipe,
    SafeHtmlPipe,
  ],
  exports: [
    TimeAgoPipe,
    AvatarPipe,
    TimeMessagePipe,
    CustomDatePipe,
    TimeStampPipe,
    SafeHtmlPipe,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
