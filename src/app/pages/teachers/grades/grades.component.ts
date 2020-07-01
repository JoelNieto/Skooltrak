import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentGrade } from 'src/app/shared/models/grades.model';
import { Course, GradeBucket } from 'src/app/shared/models/studyplans.model';
import { Reference } from 'src/app/shared/models/users.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  courses: Observable<Course[]>;
  loading = false;
  currentCourse: Course = undefined;
  grades: Observable<StudentGrade[]>;
  dailyCount = 0;
  appreciation = 0;
  final = 0;
  finalScores: { id: string; score: number }[] = [];
  listGrades: { grade: Reference; bucket: GradeBucket }[] = [];
  students: { student?: Reference; grades: StudentGrade[] }[] = [];
  constructor(
    private teachersService: TeachersService,
    private coursesService: CoursesService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.courses = this.teachersService.getCourses(
      this.session.currentTeacher.id
    );
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
    if (this.currentCourse) {
      this.grades = this.coursesService.getStudentsGrades(this.currentCourse.id);
      this.grades.subscribe((grades) => {
        grades.forEach((grade) => {
          if (
            !this.listGrades.filter((x) => x.grade.id === grade.grade.id).length
          ) {
            this.listGrades.push({ grade: grade.grade, bucket: grade.bucket });
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
      });
    }
    this.loading = false;
  }

  setScore() {
    this.finalScores = [];
    this.students.forEach((student) => {
      this.coursesService
        .getScore(this.currentCourse.id, student.student.id)
        .subscribe((score) => {
          this.finalScores.push({ id: student.student.id, score: score });
        });
    });
  }
}
