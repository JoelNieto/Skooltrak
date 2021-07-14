import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TippyModule } from '@ngneat/helipopper';

import { ProfilePopoverComponent } from './profile-popover.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, TippyModule],
  declarations: [ProfilePopoverComponent],
  exports: [ProfilePopoverComponent],
})
export class ProfilePopoverModule {}
