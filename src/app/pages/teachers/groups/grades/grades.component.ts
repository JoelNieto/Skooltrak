import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { Student } from 'src/app/shared/models/students.model';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnChanges {
  @Input() student: Student;
  periods$: Observable<Period[]>;
  score$: Observable<number>;
  constructor(
    private studentService: StudentsService,
    private periodsService: PeriodsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.student) {
      if (this.student) {
        this.periods$ = this.periodsService.getAll();
        this.score$ = this.studentService.getCurrentScore(this.student.id);
      }
    }
  }

  getValues() {
    const array: string[][] = [];
    this.periods$.subscribe(
      (periods) => {
        periods.forEach((period) => {
          array.push([period.name]);
        });
      },
      (err) => console.error(err)
    );
  }
}
