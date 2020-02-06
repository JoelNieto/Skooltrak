import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]>;
  table = new TableOptions();

  constructor(
    private coursesService: CoursesService,
    private translate: TranslateService,
    private teachersService: TeachersService,
    private plansService: StudyPlanService,
    private subjectService: SubjectsService
  ) {}

  ngOnInit(): void {
    this.table.searcheable = false;
    this.table.lookup = true;
    this.table.detailsURL = [];
    this.table.columns = [
      {
        name: 'subject',
        title: this.translate.instant('Subject'),
        type: 'object',
        asyncList: this.subjectService.getAll(),
        lookup: true,
        required: true
      },
      {
        name: 'plan',
        title: this.translate.instant('Plan'),
        type: 'object',
        asyncList: this.plansService.getAll(),
        lookup: true,
        required: true
      },
      {
        name: 'teachers',
        type: 'array',
        title: this.translate.instant('Teachers'),
        asyncList: this.teachersService.getAll(),
        objectText: 'name',
        required: true
      },
      {
        name: 'weeklyHours',
        type: 'number',
        title: this.translate.instant('Weekly Hours'),
        required: true
      }
    ];
    this.courses = this.coursesService.getAll();
  }

  createCourse(course: Course): void {
    this.coursesService.create(course).subscribe(
      res => {
        swal.fire(
          res.subject.name,
          this.translate.instant('Created item', {
            value: this.translate.instant('Course')
          }),
          'success'
        );
        this.courses = this.coursesService.getAll();
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }

  editCourse(course: Course): void {
    this.coursesService.edit(course.id, course).subscribe(
      () => {
        swal.fire(
          course.subject.name,
          this.translate.instant('Updated item', {
            value: this.translate.instant('Course')
          }),
          'success'
        );
        this.courses = this.coursesService.getAll();
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }

  deleteCourse(id: string) {
    this.coursesService.delete(id).subscribe(
      () => {
        swal.fire(
          this.translate.instant('Deleted item', {
            value: this.translate.instant('Course')
          }),
          '',
          'success'
        );
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          this.translate.instant(err.message),
          'error'
        );
      }
    );
  }

}
