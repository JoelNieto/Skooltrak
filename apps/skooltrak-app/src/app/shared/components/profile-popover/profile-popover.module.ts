import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TippyModule } from '@ngneat/helipopper';
import { TranslocoModule } from '@ngneat/transloco';
import { LoadingModalModule } from '@skooltrak/custom-components';

import { AvatarPipe } from '../../pipes/avatar.pipe';
import { ProfilePopoverComponent } from './profile-popover.component';

@NgModule({
  imports: [CommonModule, TippyModule, LoadingModalModule, TranslocoModule],
  declarations: [ProfilePopoverComponent],
  exports: [ProfilePopoverComponent],
  providers: [AvatarPipe],
})
export class ProfilePopoverModule {}
