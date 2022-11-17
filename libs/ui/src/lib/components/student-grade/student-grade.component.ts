import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Grade, Student, StudentGrade } from '@skooltrak-app/models';
import { Subscription } from 'rxjs';
import { FormComponent } from './form/form.component';
import { StudentGradeService } from './student-grade.service';

@Component({
  selector: 'skooltrak-student-grade',
  standalone: true,
  imports: [CommonModule, FormComponent, MatDialogModule],
  providers: [StudentGradeService],
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentGradeComponent implements OnDestroy {
  @Input() student!: Student;
  @Input() grade!: Grade;
  @Input() item: StudentGrade | undefined;

  private subscription = new Subscription();
  private modal = inject(MatDialog);
  private service = inject(StudentGradeService);

  public openModal() {
    const modal = this.modal.open(FormComponent, {
      panelClass: ['dialog', 'x-small'],
      data: { student: this.student, grade: this.grade, item: this.item },
    });
    this.subscription.add(
      modal.beforeClosed().subscribe({
        next: (request) => {
          console.log(request);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
