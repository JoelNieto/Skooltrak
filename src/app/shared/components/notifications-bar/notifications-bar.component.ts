import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nav[app-notifications-bar]',
  templateUrl: './notifications-bar.component.html',
  styleUrls: ['./notifications-bar.component.sass']
})
export class NotificationsBarComponent implements OnInit {

  constructor(public session: SessionService) { }

  ngOnInit(): void {
  }

}
