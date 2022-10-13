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
    MatAutocompleteModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
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
