import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageInbox } from 'src/app/shared/models/message.model';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.sass'],
})
export class InboxComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public session: SessionService
  ) {}

  ngOnInit(): void {}

  openMessage(message: MessageInbox) {
    this.router.navigate([message.id], { relativeTo: this.route });
  }
}
