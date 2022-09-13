import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Assignment, ClassGroup, Course } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { QuillModule } from 'ngx-quill';
import { combineLatestWith, startWith, Subscription } from 'rxjs';
import { AssignmentFormService } from './assignment-form.service';
import { AssignmentFormStore } from './assignment-form.store';

@Component({
  selector: 'skooltrak-assignment-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    QuillModule,
  ],
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideComponentStore(AssignmentFormStore),
    AssignmentFormService,
  ],
})
export class AssignmentFormComponent implements OnInit, OnDestroy {
  courses$ = this.coursesState.allCourses$;
  groups$ = this.store.groups$;
  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(''),
    course: new FormControl<Course | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    group: new FormControl<ClassGroup | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startDate: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startTime: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    endDate: new FormControl(new Date(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
    endTime: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  subscription = new Subscription();

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { current?: Assignment; course?: Course },
    private readonly coursesState: teacher_courses.CoursesFacade,
    public readonly store: AssignmentFormStore
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.form.get('course')?.valueChanges.subscribe({
        next: (_course) => {
          if (_course) {
            this.store.setCourse(_course);
          }
        },
      })
    );

    this.subscription.add(
      this.form
        .get('startDate')
        ?.valueChanges.pipe(
          startWith(new Date()),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          combineLatestWith(this.form.get('startTime')?.valueChanges!)
        )
        .subscribe({
          next: ([date, time]) => {
            this.store.setStart({ date, time });
          },
        })
    );

    this.subscription.add(
      this.form
        .get('endDate')
        ?.valueChanges.pipe(
          startWith(new Date()),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          combineLatestWith(this.form.get('endTime')?.valueChanges!)
        )
        .subscribe({
          next: ([date, time]) => {
            this.store.setEnd({ date, time });
          },
        })
    );

    const { course } = this.data;
    course && this.form.get('course')?.patchValue(course);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
