import { CommonModule, formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
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
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import {
  Assignment,
  AssignmentType,
  ClassGroup,
  Course,
} from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { QuillModule } from 'ngx-quill';
import { combineLatestWith, filter, map, startWith, Subscription } from 'rxjs';
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
    MatSnackBarModule,
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
  types$ = this.store.types$;
  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(''),
    course: new FormControl<Course | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl<AssignmentType | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    group: new FormControl<ClassGroup | undefined>(undefined, {
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

  public courseDisabled$ = this.store.disabledCourse$;
  public groupsDisabled$ = this.store.disableGroup$;

  constructor(
    private readonly dialog: MatDialogRef<AssignmentFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { current?: Assignment; course?: Course },
    @Inject(LOCALE_ID) private locale: string,
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

    this.subscription.add(
      this.store.close$.pipe(filter((value) => value)).subscribe({
        next: () => {
          this.dialog.close();
        },
      })
    );

    this.subscription.add(
      this.store.current$.subscribe({
        next: (current) => {
          current && this.form.patchValue(current);
        },
      })
    );

    const { course, current } = this.data;

    if (current) {
      this.store.setCurrent(current);
      this.form
        .get('startTime')
        ?.patchValue(formatDate(current.start, 'hh:mm', this.locale));
      this.form
        .get('endTime')
        ?.patchValue(formatDate(current.end, 'hh:mm', this.locale));
    }
    course && this.form.get('course')?.patchValue(course);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveChanges() {
    const value: Partial<Assignment> = this.form.getRawValue();
    const { start$, end$ } = this.store;
    start$
      .pipe(
        combineLatestWith(end$),
        map(([start, end]) => ({ ...value, start, end }))
      )
      .subscribe({
        next: (assignment) => this.store.createAssignment(assignment),
      });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }
}
