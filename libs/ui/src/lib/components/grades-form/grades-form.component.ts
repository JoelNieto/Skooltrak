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
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClassGroup, Course, Grade } from '@skooltrak-app/models';

@Component({
  selector: 'skooltrak-grades-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './grades-form.component.html',
  styleUrls: ['./grades-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradesFormComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    course: new FormControl<Course | undefined>(undefined, {
      nonNullable: true,
    }),
    date: new FormControl<Date>(new Date()),
    groups: new FormControl<ClassGroup[]>([]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { grade: Grade; course: Course }
  ) {}

  ngOnInit(): void {
    const { grade, course } = this.data;

    grade && this.form.patchValue(grade);
  }
}
