import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { StudentGrade } from 'src/app/shared/models/grades.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Course, GradeBucket } from 'src/app/shared/models/studyplans.model';
import { Reference } from 'src/app/shared/models/users.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';
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

  periods: Observable<Period[]>;
  active = 1;
  constructor(
    private teachersService: TeachersService,
    public storage: StorageService,
    private coursesService: CoursesService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.courses = this.teachersService.getCourses(
      this.session.currentTeacher.id
    );
    this.periods = this.storage.getFromStorage(StorageEnum.Periods);
  }
}
