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
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Period, School } from '@skooltrak-app/models';
import { PeriodsFormService } from './periods-form.service';
import { PeriodsFormStore } from './periods-form.store';

@Component({
  selector: 'skooltrak-periods-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <h2 mat-dialog-title>{{ 'Period' | translate }}</h2>
      <mat-dialog-content>
        <mat-form-field>
          <mat-label>{{ 'Name' | translate }}</mat-label>
          <input type="text" matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'School' | translate }}</mat-label>
          <mat-select formControlName="school" [compareWith]="compareFn">
            <mat-option
              *ngFor="let school of schools$ | async"
              [value]="school"
              >{{ school.shortName }}</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Sort' | translate }}</mat-label>
          <input type="number" matInput formControlName="sort" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Start date' | translate }}</mat-label>
          <input matInput [matDatepicker]="start" formControlName="startDate" />
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle
            matSuffix
            [for]="start"
          ></mat-datepicker-toggle>
          <mat-datepicker #start></mat-datepicker>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'End date' | translate }}</mat-label>
          <input matInput [matDatepicker]="end" formControlName="endDate" />
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matSuffix [for]="end"></mat-datepicker-toggle>
          <mat-datepicker #end></mat-datepicker>
        </mat-form-field>
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
  providers: [PeriodsFormService, provideComponentStore(PeriodsFormStore)],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodsFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    sort: new FormControl<number>(1, { validators: [Validators.required] }),
    school: new FormControl<School>(undefined, {
      validators: [Validators.required],
    }),
    startDate: new FormControl<Date>(undefined),
    endDate: new FormControl<Date>(undefined),
  });
  schools$ = this.store.schools$;
  constructor(
    @Inject(MAT_DIALOG_DATA) private period: Period,
    private store: PeriodsFormStore,
    private dialog: MatDialogRef<PeriodsFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.period);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
