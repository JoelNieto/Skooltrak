import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileIconDirective } from './directives/file-icon.directive';
import { AvatarPipe } from './pipes/avatar.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
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
    SafeHtmlPipe,
    FileIconDirective,
  ],
  exports: [
    TimeAgoPipe,
    AvatarPipe,
    TimeMessagePipe,
    CustomDatePipe,
    TimeStampPipe,
    SafeHtmlPipe,
    FileIconDirective
  ],
  imports: [CommonModule],
})
export class SharedModule {}
