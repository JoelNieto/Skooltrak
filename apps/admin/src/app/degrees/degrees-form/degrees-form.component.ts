import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
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
import { Degree, LevelEnum, School } from '@skooltrak-app/models';
import { DegreesFormService } from './degrees-form.service';
import { DegreesFormStore } from './degrees-form.store';

@Component({
  selector: 'skooltrak-degrees-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    TranslateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <h2 mat-dialog-title>{{ 'Degree data' | translate }}</h2>
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
              >{{ school.name }}</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Level' | translate }}</mat-label>
          <mat-select formControlName="level">
            <mat-option [value]="levels.Maternal">{{
              levels.Maternal
            }}</mat-option>
            <mat-option [value]="levels.Kinder">{{ levels.Kinder }}</mat-option>
            <mat-option [value]="levels.Elementary">{{
              levels.Elementary
            }}</mat-option>
            <mat-option [value]="levels.MiddleSchool">{{
              levels.MiddleSchool
            }}</mat-option>
            <mat-option [value]="levels.HighSchool">{{
              levels.HighSchool
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
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(DegreesFormStore), DegreesFormService],
})
export class DegreesFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    level: new FormControl<LevelEnum>(undefined, [Validators.required]),
    school: new FormControl<School>(undefined, [Validators.required]),
    active: new FormControl(true),
  });
  schools$ = this.store.schools$;
  levels = LevelEnum;
  constructor(
    private fb: FormBuilder,
    private store: DegreesFormStore,
    @Inject(MAT_DIALOG_DATA) private degree: Degree,
    private dialog: MatDialogRef<DegreesFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.degree);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
