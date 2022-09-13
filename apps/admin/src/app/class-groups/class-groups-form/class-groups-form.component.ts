import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
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
import { ClassGroup } from '@skooltrak-app/models';
import { class_groups } from '@skooltrak-app/state';
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
          cdkFocusInitial
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
  form!: FormGroup;
  teachers$ = this.store.teachers$;
  plans$ = this.store.plans$;

  constructor(
    private readonly state: class_groups.ClassGroupsFacade,
    private readonly store: ClassGroupFormStore,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialogRef<ClassGroupsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private group: ClassGroup | undefined
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.group?.name, [Validators.required]],
      plan: [this.group?.plan, [Validators.required]],
      counselor: [this.group?.counselor],
    });
  }

  saveChanges() {
    const { value } = this.form;

    if (this.group) {
      this.state.edit(this.group._id, value);
    } else {
      this.state.create(value);
    }
    this.dialog.close();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
