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
import { Gender, Teacher } from '@skooltrak-app/models';
import { teachers } from '@skooltrak-app/state';
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
  form!: FormGroup;
  gender = Gender;

  constructor(
    private readonly fb: FormBuilder,
    private state: teachers.TeachersFacade,
    private store: TeachersFormStore,
    @Inject(MAT_DIALOG_DATA) private teacher: Teacher | undefined,
    private readonly dialog: MatDialogRef<TeachersFormComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.teacher?.firstName, [Validators.required]],
      middleName: [this.teacher?.middleName, []],
      surname: [this.teacher?.surname, [Validators.required]],
      secondSurname: [this.teacher?.secondSurname, []],
      email: [this.teacher?.email, [Validators.required, Validators.email]],
      documentId: [this.teacher?.documentId, [Validators.required]],
      birthDate: [this.teacher?.birthDate, [Validators.required]],
      subjects: [this.teacher?.subjects],
      gender: [this.teacher?.gender, [Validators.required]],
    });
  }

  saveChanges() {
    const { value } = this.form;
    if (this.teacher) {
      this.state.edit(this.teacher._id, value);
    } else {
      this.state.create(value);
    }

    this.dialog.close();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
