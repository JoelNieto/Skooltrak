import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { Grade } from 'src/app/shared/models/grades.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.sass'],
})
export class GradesComponent implements OnInit {
  @Input() course: Course;

  $grades: Observable<Grade[]>;
  $periods: Observable<Period[]>;
  active: number;
  constructor(
    private courseService: CoursesService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.$periods = this.storage.getFromStorage(StorageEnum.Periods);
    this.$grades = this.courseService.getPeriodGrades(
      this.course.id,
      this.course.currentPeriod.id
    );
    this.active = this.course.currentPeriod.sort;
  }
}
