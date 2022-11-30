import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'skooltrak-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `<h1 mat-dialog-title>{{ 'Want to delete' | translate }}</h1>
    <mat-dialog-content>
      {{ 'This cannot be reversed' | translate }}
      <div class="description">
        <mat-icon>error</mat-icon> {{ data.description }}
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false" color="warn">
        {{ 'Cancel' | translate }}
      </button>
      <button
        type="submit"
        mat-flat-button
        color="warn"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        {{ 'Confirm' | translate }}
      </button>
    </mat-dialog-actions> `,
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
