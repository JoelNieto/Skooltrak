import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeStudent } from 'src/app/shared/models/grades.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Course, GradeBucket } from 'src/app/shared/models/studyplans.model';
import { Reference } from 'src/app/shared/models/users.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'skooltrak-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading = false;
  currentCourse: Course = undefined;
  dailyCount = 0;
  appreciation = 0;
  final = 0;
  finalScores: { id: string; score: number }[] = [];
  listGrades: { grade: Reference; bucket: GradeBucket }[] = [];
  students: { student?: Reference; grades: GradeStudent[] }[] = [];

  periods$: Observable<Period[]>;
  active = 1;
  constructor(
    private teachersService: TeachersService,
    public periodsService: PeriodsService,
    public coursesService: CoursesService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.courses$ = this.teachersService.getCourses(
      this.session.currentTeacher.id
    );
    this.periods$ = this.periodsService.getAll();
  }
}
