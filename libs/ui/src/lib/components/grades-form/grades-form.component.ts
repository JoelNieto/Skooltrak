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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import {
  ClassGroup,
  Course,
  Grade,
  GradeType,
  Period,
} from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { Subscription } from 'rxjs';
import { GradesFormService } from './grades-form.service';
import { GradesFormStore } from './grades-form.store';
@Component({
  selector: 'skooltrak-grades-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './grades-form.component.html',
  styleUrls: ['./grades-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GradesFormService, provideComponentStore(GradesFormStore)],
})
export class GradesFormComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    course: new FormControl<Course | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl<GradeType | undefined>(undefined, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    period: new FormControl<Period | undefined>(undefined, {
      validators: [Validators.required],
    }),
    date: new FormControl<Date>(new Date()),
    groups: new FormControl<ClassGroup[]>([], {
      validators: [Validators.minLength(1), Validators.required],
      nonNullable: true,
    }),
  });
  periods$ = this.store.periods$;
  types$ = this.store.types$;
  groups$ = this.store.groups$;
  selectedGroups$ = this.store.selectedGroups$;
  courses$ = this.state.allCourses$;
  subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { grade: Grade; course: Course; period: Period },
    private store: GradesFormStore,
    private state: teacher_courses.CoursesFacade
  ) {}

  ngOnInit(): void {
    const { grade, course, period } = this.data;

    grade && this.form.patchValue(grade);
    course && this.form.get('course')?.patchValue(course);
    course && this.form.get('course')?.patchValue(course);
    period && this.form.get('period')?.patchValue(period);
    this.form.get('groups')?.valueChanges.subscribe({
      next: (groups) => {
        this.store.setSelectedGroups(groups);
      },
    });
  }
}
