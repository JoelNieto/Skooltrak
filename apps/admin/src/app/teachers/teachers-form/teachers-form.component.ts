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
  templateUrl: './teachers-form.component.html',
  styleUrls: ['./teachers-form.component.scss'],
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
