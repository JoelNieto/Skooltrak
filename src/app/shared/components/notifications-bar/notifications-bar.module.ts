import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { NotificationsBarComponent } from './notifications-bar.component';

@NgModule({
  declarations: [NotificationsBarComponent],
  imports: [CommonModule, RouterModule, TranslocoModule],
  exports: [NotificationsBarComponent]
})
export class NotificationsBarModule {}
