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
  styles: [
    `
      @use '@angular/material' as mat;

      $warn-palette: mat.define-palette(mat.$red-palette);

      .description {
        color: mat.get-color-from-palette($warn-palette, 'darker');
        background-color: mat.get-color-from-palette($warn-palette, 100);
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 0.5rem;
        display: flex;
        mat-icon {
          margin-right: 0.5rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
