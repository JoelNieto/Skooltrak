import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MessagesFacade } from '../+state/messages.facade';

@Component({
  selector: 'skooltrak-app-inbox',
  standalone: true,
  imports: [CommonModule, MatListModule, TranslateModule],
  template: `
    <mat-selection-list>
      <mat-list-option>
        {{ 'Item' | translate }}
      </mat-list-option>
    </mat-selection-list>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
  constructor(private store: MessagesFacade) {}

  ngOnInit(): void {
    this.store.init();
  }
}
