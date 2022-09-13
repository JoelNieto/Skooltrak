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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { Course } from '@skooltrak-app/models';
import { courses } from '@skooltrak-app/state';
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
    MatAutocompleteModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(CoursesFormStore), CoursesFormService],
})
export class CoursesFormComponent implements OnInit {
  subjects$ = this.store.subjects$;
  plans$ = this.store.plans$;
  teachers$ = this.store.teachers$;
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private course: Course | undefined,
    private dialog: MatDialogRef<CoursesFormComponent>,
    private readonly fb: FormBuilder,
    private store: CoursesFormStore,
    private state: courses.CoursesFacade
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      subject: [this.course?.subject, [Validators.required]],
      parentSubject: [this.course?.parentSubject],
      plan: [this.course?.plan, [Validators.required]],
      teachers: [this.course?.teachers ?? []],
      weeklyHours: [this.course?.weeklyHours, [Validators.required]],
      active: [this.course?.active],
    });
  }

  saveChanges() {
    const { value } = this.form;
    if (this.course) {
      this.state.edit(this.course._id, value);
    } else {
      this.state.create(value);
    }
    this.dialog.close();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
