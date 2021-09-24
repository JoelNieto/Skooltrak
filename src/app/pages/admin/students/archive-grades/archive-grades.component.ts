import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-archive-grades',
  templateUrl: './archive-grades.component.html',
  styleUrls: ['./archive-grades.component.sass'],
})
export class ArchiveGradesComponent implements OnInit {
  @Input() student: Student;
  years$: Observable<number[]>;
  currentYear: number;
  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.years$ = this.studentsService.getArchiveYears(this.student.id);
  }

  setYear(year: number) {
    this.studentsService.getArchiveGrades(this.student.id, year).subscribe(
      (res) => {
        console.info(res);
      },
      (err) => console.error(err)
    );
  }
}
