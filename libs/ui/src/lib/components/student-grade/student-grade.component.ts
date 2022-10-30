import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StudentGrade } from '@skooltrak-app/models';

@Component({
  selector: 'skooltrak-student-grade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGradeComponent {
  @Input() grade: StudentGrade | undefined;
}
