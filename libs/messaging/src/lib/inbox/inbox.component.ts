import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesFacade } from '../+state/messages.facade';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'skooltrak-app-inbox',
  standalone: true,
  imports: [CommonModule, MatListModule, TranslateModule],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
  constructor(private store: MessagesFacade) {}

  ngOnInit(): void {
    this.store.init();
  }
}
