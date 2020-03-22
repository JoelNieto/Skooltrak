import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarPipe } from './pipes/avatar.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [TimeAgoPipe, AvatarPipe ],
  exports: [TimeAgoPipe, AvatarPipe],
  imports: [CommonModule]
})
export class SharedModule {}
