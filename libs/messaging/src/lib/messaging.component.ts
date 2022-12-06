import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  template: `
    <mat-card>
      <mat-card-content>
        <div class="header-container">
          <mat-card-title>{{ 'Messages' | translate }}</mat-card-title>
          <button mat-flat-button color="primary" (click)="compose()">
            New Message
          </button>
        </div>

        <mat-tab-group mat-stretch-tabs="false">
          <mat-tab [label]="'Inbox' | translate">
            <skooltrak-app-inbox></skooltrak-app-inbox>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  styles: [],
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
export class MessagingComponent {
  constructor(private readonly dialog: MatDialog) {}

  compose() {
    this.dialog.open(ComposeComponent, { panelClass: ['dialog', 'medium'] });
  }
}
