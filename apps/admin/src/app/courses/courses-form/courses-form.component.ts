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
import { Course, StudyPlan, Subject, Teacher } from '@skooltrak-app/models';
import { CoursesService } from '../courses.service';
import { CoursesStore } from '../courses.store';
import { CoursesFormService } from './courses-form.service';
import { CoursesFormStore } from './courses-form.store';

@Component({
  selector: 'skooltrak-courses-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <h2 mat-dialog-title>{{ 'Course' | translate }}</h2>
      <mat-dialog-content>
        <mat-form-field>
          <mat-label>{{ 'Plan' | translate }}</mat-label>
          <mat-select formControlName="plan" [compareWith]="compareFn">
            <mat-option *ngFor="let plan of plans$ | async" [value]="plan">{{
              plan.name
            }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Teachers' | translate }}</mat-label>
          <mat-select
            formControlName="teachers"
            multiple
            [compareWith]="compareFn"
          >
            <mat-option
              *ngFor="let teacher of teachers$ | async"
              [value]="teacher"
            >
              {{ teacher.firstName }} {{ teacher.surname }}</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Subject' | translate }}</mat-label>
          <mat-select formControlName="subject" [compareWith]="compareFn">
            <mat-option
              *ngFor="let subject of subjects$ | async"
              [value]="subject"
              >{{ subject.name }}</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Parent subject' | translate }}</mat-label>
          <mat-select formControlName="parentSubject" [compareWith]="compareFn">
            <mat-option
              *ngFor="let subject of subjects$ | async"
              [value]="subject"
              >{{ subject.name }}</mat-option
            >
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Weekly hours' | translate }}</mat-label>
          <input type="number" matInput formControlName="weeklyHours" />
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
  providers: [
    provideComponentStore(CoursesFormStore),
    CoursesFormService,
    CoursesService,
    CoursesStore,
  ],
})
export class CoursesFormComponent implements OnInit {
  subjects$ = this.store.subjects$;
  plans$ = this.store.plans$;
  teachers$ = this.store.teachers$;
  form = new FormGroup({
    subject: new FormControl<Subject>(undefined, {
      validators: [Validators.required],
    }),
    parentSubject: new FormControl<Subject>(undefined),
    plan: new FormControl<StudyPlan>(undefined, {
      validators: [Validators.required],
    }),
    teachers: new FormControl<Teacher[]>([]),
    weeklyHours: new FormControl<number>(undefined),
    active: new FormControl<boolean>(true),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private course: Course | undefined,
    private dialog: MatDialogRef<CoursesFormComponent>,
    private readonly fb: FormBuilder,
    private store: CoursesFormStore,
    private state: CoursesStore
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.course);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
