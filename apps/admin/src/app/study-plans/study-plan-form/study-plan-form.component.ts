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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Degree, StudyPlan, YearEnum } from '@skooltrak-app/models';
import { StudyPlanFormService } from './study-plan-form.service';
import { StudyPlanFormStore } from './study-plan-form.store';

@Component({
  selector: 'skooltrak-study-plan-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <h2 mat-dialog-title>{{ 'Plan' | translate }}</h2>
      <mat-dialog-content>
        <mat-form-field>
          <mat-label>{{ 'Name' | translate }}</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Degree' | translate }}</mat-label>
          <mat-select formControlName="degree" [compareWith]="compareFn">
            <mat-option
              *ngFor="let degree of degrees$ | async"
              [value]="degree"
              >{{ degree.name }}</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>
            {{ 'Year' | translate }}
          </mat-label>
          <mat-select formControlName="year">
            <mat-option *ngFor="let year of years" [value]="year.value">{{
              year.value | translate
            }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-slide-toggle formControlName="active" color="primary">{{
          'Active' | translate
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
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(StudyPlanFormStore), StudyPlanFormService],
})
export class StudyPlanFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    degree: new FormControl<Degree>(undefined, {
      validators: [Validators.required],
    }),
    active: new FormControl<boolean>(true),
    year: new FormControl<YearEnum>(undefined, {
      validators: [Validators.required],
    }),
  });

  schools$ = this.store.schools$;
  degrees$ = this.store.degrees$;
  years = Object.keys(YearEnum).map((name) => {
    return {
      name,
      value: YearEnum[name as keyof typeof YearEnum],
    };
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private plan: StudyPlan | undefined,
    private readonly dialog: MatDialogRef<StudyPlanFormComponent>,
    private readonly store: StudyPlanFormStore
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.plan);
  }

  saveChanges(): void {
    let value: Partial<StudyPlan> = this.form.getRawValue();

    value = { ...value, level: value.degree.level };
    value = { ...value, school: value.degree.school };

    this.dialog.close(value);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
