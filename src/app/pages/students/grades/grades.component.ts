import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from 'src/app/shared/models/periods.model';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  periods$: Observable<Period[]>;
  score$: Observable<number>;
  constructor(
    public session: SessionService,
    private studentService: StudentsService,
    private periodsService: PeriodsService
  ) {}

  ngOnInit(): void {
    this.periods$ = this.periodsService.getAll();
    this.score$ = this.studentService.getCurrentScore(
      this.session.currentStudent.id
    );
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
