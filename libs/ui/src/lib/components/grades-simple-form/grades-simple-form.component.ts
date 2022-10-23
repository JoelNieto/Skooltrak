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
import { ClassGroup, Course, GradeType, Period } from '@skooltrak-app/models';
import { GradesSimpleFormService } from './grades-simple-form.service';
import { GradesSimpleFormStore } from './grades-simple-form.store';

@Component({
  selector: 'skooltrak-grades-simple-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './grades-simple-form.component.html',
  styleUrls: ['./grades-simple-form.component.scss'],
  providers: [
    provideComponentStore(GradesSimpleFormStore),
    GradesSimpleFormService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesSimpleFormComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    type: new FormControl<GradeType | null>(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: new FormControl<Date>(new Date(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  types$ = this.store.types$;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { course: Course; period: Period; group: ClassGroup },
    private dialog: MatDialogRef<GradesSimpleFormComponent>,
    private store: GradesSimpleFormStore
  ) {}

  ngOnInit(): void {
    this.store.setState({ types: [], course: this.data.course });
  }

  saveChanges() {
    this.dialog.close(this.form.getRawValue());
  }
}
