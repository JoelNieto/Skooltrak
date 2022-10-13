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
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { ClassGroup, StudyPlan, Teacher } from '@skooltrak-app/models';
import { ClassGroupsFormService } from './class-groups-form.service';
import { ClassGroupFormStore } from './class-groups-form.store';

@Component({
  selector: 'skooltrak-class-groups-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="saveChanges()">
      <h2 mat-dialog-title>{{ 'Group' | translate }}</h2>
      <mat-dialog-content>
        <mat-form-field>
          <mat-label>{{ 'Name' | translate }}</mat-label>
          <input type="text" matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Plan' | translate }}</mat-label>
          <mat-select formControlName="plan" [compareWith]="compareFn">
            <mat-option *ngFor="let plan of plans$ | async" [value]="plan">{{
              plan.name
            }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <mat-label>{{ 'Counselor' | translate }}</mat-label>
          <mat-select formControlName="counselor" [compareWith]="compareFn">
            <mat-option
              *ngFor="let teacher of teachers$ | async"
              [value]="teacher"
              >{{ teacher.firstName }} {{ teacher.surname }}</mat-option
            >
          </mat-select>
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
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideComponentStore(ClassGroupFormStore),
    ClassGroupsFormService,
  ],
})
export class ClassGroupsFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    plan: new FormControl<StudyPlan>(undefined, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    counselor: new FormControl<Teacher>(undefined),
  });
  teachers$ = this.store.teachers$;
  plans$ = this.store.plans$;

  constructor(
    private readonly store: ClassGroupFormStore,
    private readonly dialog: MatDialogRef<ClassGroupsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private group: ClassGroup
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.group);
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
