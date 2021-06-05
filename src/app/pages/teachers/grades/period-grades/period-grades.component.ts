import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentGrade } from 'src/app/shared/models/grades.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Course, GradeBucket } from 'src/app/shared/models/studyplans.model';
import { Reference } from 'src/app/shared/models/users.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-period-grades',
  templateUrl: './period-grades.component.html',
  styleUrls: ['./period-grades.component.sass'],
})
export class PeriodGradesComponent implements OnChanges {
  @Input() course: Course;
  @Input() period: Period;

  loading = false;
  grades$: Observable<StudentGrade[]>;
  dailyCount = 0;
  appreciation = 0;
  final = 0;
  finalScores: { id: string; score: number }[] = [];
  listGrades: { grade: Reference; bucket: GradeBucket }[] = [];
  students: { student?: Reference; grades: StudentGrade[] }[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.course) {
      if (this.course) {
        this.getGrades();
      }
    }
  }

  getScore(id: string) {
    return this.finalScores.filter((x) => x.id === id)[0]?.score;
  }

  getGrades() {
    this.loading = true;
    this.listGrades = [];
    this.students = [];
    this.dailyCount = 0;
    this.appreciation = 0;
    this.final = 0;
    if (this.course) {
      this.grades$ = this.coursesService.getStudentsGrades(
        this.course.id,
        this.period.id
      );
      this.grades$.subscribe(
        (grades) => {
          grades.forEach((grade) => {
            if (
              !this.listGrades.filter((x) => x.grade.id === grade.grade.id)
                .length
            ) {
              this.listGrades.push({
                grade: grade.grade,
                bucket: grade.bucket,
              });
              switch (grade.bucket.id) {
                case 1:
                  this.dailyCount++;
                  break;
                case 2:
                  this.appreciation++;
                  break;
                case 3:
                  this.final++;
                  break;
                default:
                  break;
              }
            }
            if (
              !this.students.filter((x) => x.student.id === grade.student.id)
                .length
            ) {
              this.students.push({ student: grade.student, grades: [grade] });
            } else {
              const current = this.students.filter(
                (x) => x.student.id === grade.student.id
              )[0];
              current.grades.push(grade);
            }
          });
          if (grades.length) {
            this.setScore();
          }
          this.loading = false;
        },
        (err) => console.error(err)
      );
    }
    this.loading = false;
  }

  setScore() {
    this.finalScores = [];
    this.students.forEach((student) => {
      this.coursesService
        .getPeriodScore(this.course.id, student.student.id, this.period.id)
        .subscribe(
          (score) => {
            this.finalScores.push({ id: student.student.id, score });
          },
          (err) => console.error(err)
        );
    });
  }
}
