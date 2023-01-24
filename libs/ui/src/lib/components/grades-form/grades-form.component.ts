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
import {
  ClassGroup,
  Course,
  Grade,
  GradeType,
  Period,
} from '@skooltrak-app/models';
import { GradesFormService } from './grades-form.service';
import { GradesFormStore } from './grades-form.store';

@Component({
  selector: 'skooltrak-grades-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `<form [formGroup]="form" (ngSubmit)="saveChanges()">
    <h2 mat-dialog-title>{{ 'New grade' | translate }}</h2>
    <mat-dialog-content>
      <div class="row">
        <mat-form-field class="col-md-4">
          <mat-label>{{ 'Title' | translate }}</mat-label>
          <input matInput formControlName="title" />
        </mat-form-field>
        <mat-form-field class="col-md-4">
          <mat-label>{{ 'Type' | translate }}</mat-label>
          <mat-select formControlName="type" [compareWith]="compareFn">
            <mat-option *ngFor="let type of types$ | async" [value]="type">{{
              type.name
            }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="col-md-4">
          <mat-label>{{ 'Date' | translate }}</mat-label>
          <input matInput [matDatepicker]="date" formControlName="date" />
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matSuffix [for]="date" />
          <mat-datepicker #date />
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]>{{ 'Cancel' | translate }}</button>
      <button
        mat-flat-button
        type="submit"
        color="primary"
        [disabled]="form.invalid"
      >
        {{ 'Save' | translate }}
      </button>
    </mat-dialog-actions>
  </form> `,
  styles: [],
  providers: [provideComponentStore(GradesFormStore), GradesFormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesFormComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    type: new FormControl<GradeType | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: new FormControl<Date>(new Date(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  types$ = this.store.types$;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      course: Course;
      period: Period;
      group: ClassGroup;
      grade: Grade;
    },
    private dialog: MatDialogRef<GradesFormComponent>,
    private store: GradesFormStore
  ) {}

  ngOnInit(): void {
    if (this.data.grade) {
      this.form.patchValue(this.data.grade);
      this.store.setState({ types: [], course: this.data.grade.course });
    } else {
      this.store.setState({ types: [], course: this.data.course });
    }
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
