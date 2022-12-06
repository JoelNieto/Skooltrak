import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentType } from '@skooltrak-app/models';

@Component({
  selector: 'skooltrak-assignment-types-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ 'Assignment type' | translate }}</h2>
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <mat-dialog-content>
        <mat-form-field>
          <mat-label>{{ 'Name' | translate }}</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Color' | translate }}</mat-label>
          <mat-select formControlName="color">
            <mat-option value="blue">{{ 'Blue' | translate }} </mat-option>
            <mat-option value="yellow">{{ 'Yellow' | translate }}</mat-option>
            <mat-option value="red">{{ 'Red' | translate }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-slide-toggle formControlName="summative" color="primary">{{
          'Summative' | translate
        }}</mat-slide-toggle>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button [mat-dialog-close]>
          {{ 'Cancel' | translate }}
        </button>
        <button
          type="submit"
          mat-flat-button
          color="primary"
          [disabled]="form.invalid || form.pristine"
        >
          {{ 'Save' | translate }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [
    `
      .dot {
        height: 25px;
        width: 25px;
        margin-top: 0.65rem;
        margin-right: 1rem;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
      }

      .mat-option-text {
        display: inline-flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentTypesFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    summative: new FormControl<boolean>(false),
    color: new FormControl<'red' | 'yellow' | 'blue'>('blue', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private type: AssignmentType | undefined,
    private readonly dialog: MatDialogRef<AssignmentTypesFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.type);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }
}
