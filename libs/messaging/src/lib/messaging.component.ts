import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

import { ComposeComponent } from './compose/compose.component';
import { InboxComponent } from './inbox/inbox.component';

@Component({
  selector: 'skooltrak-app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    TranslateModule,
    MatDialogModule,
    InboxComponent,
    ComposeComponent,
  ],
})
export class MessagingComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  compose() {
    this.dialog.open(ComposeComponent, { panelClass: ['dialog', 'medium'] });
  }
}
