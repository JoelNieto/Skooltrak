import { Component } from '@angular/core';

import { SessionService } from '../../services/session.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nav[skooltrak-notifications-bar]',
  templateUrl: './notifications-bar.component.html',
  styleUrls: ['./notifications-bar.component.sass'],
})
export class NotificationsBarComponent {
  constructor(public session: SessionService) {}
}
