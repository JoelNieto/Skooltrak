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
import { Gender, Subject, Teacher } from '@skooltrak-app/models';
import { TeachersFormService } from './teachers-form.service';
import { TeachersFormStore } from './teachers-form.store';

@Component({
  selector: 'skooltrak-teachers-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    TranslateModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <h2 mat-dialog-title>{{ 'Teacher' | translate }}</h2>
      <mat-dialog-content>
        <div class="row">
          <div class="col-lg-6">
            <mat-form-field>
              <mat-label>{{ 'First name' | translate }}</mat-label>
              <input type="text" matInput formControlName="firstName" />
            </mat-form-field>
          </div>
          <div class="col-lg-6">
            <mat-form-field>
              <mat-label>{{ 'Middle name' | translate }}</mat-label>
              <input type="text" matInput formControlName="middleName" />
            </mat-form-field>
          </div>
          <div class="col-lg-6">
            <mat-form-field>
              <mat-label>{{ 'Surname' | translate }}</mat-label>
              <input type="text" matInput formControlName="surname" />
            </mat-form-field>
          </div>
          <div class="col-lg-6">
            <mat-form-field>
              <mat-label>{{ 'Second surname' | translate }}</mat-label>
              <input type="text" matInput formControlName="secondSurname" />
            </mat-form-field>
          </div>
          <div class="col-lg-6">
            <mat-form-field>
              <mat-label>{{ 'Email ' | translate }}</mat-label>
              <input type="email" matInput formControlName="email" />
            </mat-form-field>
          </div>
          <div class="col-lg-6">
            <mat-form-field>
              <mat-label>{{ 'Subjects' | translate }}</mat-label>
              <mat-select
                multiple="true"
                formControlName="subjects"
                [compareWith]="compareFn"
              >
                <mat-option
                  *ngFor="let subject of subjects$ | async"
                  [value]="subject"
                  >{{ subject.name }}</mat-option
                >
              </mat-select>
            </mat-form-field>
          </div>
          <div class="col-lg-4">
            <mat-form-field>
              <mat-label>{{ 'Gender' | translate }}</mat-label>
              <mat-select formControlName="gender">
                <mat-option [value]="gender.Female">{{
                  gender.Female | translate
                }}</mat-option>
                <mat-option [value]="gender.Male">{{
                  gender.Male | translate
                }}</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div class="col-lg-4">
            <mat-form-field>
              <mat-label>{{ 'Date of birth' | translate }}</mat-label>
              <input
                matInput
                [matDatepicker]="picker"
                formControlName="birthDate"
              />
              <mat-hint>MM/DD/YYYY</mat-hint>
              <mat-datepicker-toggle
                matSuffix
                [for]="picker"
              ></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </div>
          <div class="col-lg-4">
            <mat-form-field>
              <mat-label>{{ 'Document ID' | translate }}</mat-label>
              <input type="text" matInput formControlName="documentId" />
            </mat-form-field>
          </div>
        </div>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(TeachersFormStore), TeachersFormService],
})
export class TeachersFormComponent implements OnInit {
  subjects$ = this.store.subjects$;
  form = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    middleName: new FormControl(''),
    surname: new FormControl('', { validators: [Validators.required] }),
    secondSurname: new FormControl(''),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    documentId: new FormControl('', { validators: [Validators.required] }),
    birthDate: new FormControl<Date>(undefined, {
      validators: [Validators.required],
    }),
    subjects: new FormControl<Subject[]>([]),
    gender: new FormControl<Gender>(undefined, {
      validators: [Validators.required],
    }),
  });
  gender = Gender;

  constructor(
    private store: TeachersFormStore,
    @Inject(MAT_DIALOG_DATA) private teacher: Teacher,
    private readonly dialog: MatDialogRef<TeachersFormComponent>
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.teacher);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
