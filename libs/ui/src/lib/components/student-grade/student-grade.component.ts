import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { Grade, Student, StudentGrade } from '@skooltrak-app/models';
import { DecimalScoreDirective } from '../../directives';
import { StudentGradeService } from './student-grade.service';

@Component({
  selector: 'skooltrak-student-grade',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    DecimalScoreDirective,
  ],
  providers: [StudentGradeService],
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGradeComponent {
  @Input() student!: Student;
  @Input() grade!: Grade;
  @Input() item: StudentGrade | undefined;

  scoreControl = new FormControl<string | null>('4.0', {
    validators: [Validators.max(5), Validators.min(1)],
  });

  private service = inject(StudentGradeService);

  saveGrade() {
    const score = Number(this.scoreControl.getRawValue()) ?? null;
    this.service
      .setGrade({ student: this.student._id, grade: this.grade._id }, score)
      .subscribe({
        next: (payload) => {
          console.info(payload);
        },
      });
  }
}
