import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesFacade } from '../+state/messages.facade';

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
