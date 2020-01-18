import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, StudyPlan } from 'src/app/shared/models/studyplans.model';
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
export class CoursesComponent implements OnInit, OnChanges {
  @Input() plan: StudyPlan;
  courses: Observable<Course[]>;
  plans: Observable<StudyPlan[]>;
  table = new TableOptions();
  selectedId: string = undefined;
  constructor(
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
    private plansService: StudyPlanService,
    private translate: TranslateService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.table.searcheable = false;
    this.plans = this.plansService
      .getAll()
      .pipe(map(plans => plans.filter(x => x.id !== this.plan.id)));
    this.table.columns = [
      {
        name: 'subject',
        title: this.translate.instant('Subject'),
        type: 'object',
        asyncList: this.subjectsService.getAll(),
        required: true
      },
      {
        name: 'weeklyHours',
        title: this.translate.instant('Weekly Hours'),
        type: 'number',
        required: true
      },
      {
        name: 'teachers',
        title: this.translate.instant('Teachers'),
        asyncList: this.teachersService.getAll(),
        type: 'array',
        required: true,
        objectText: 'name'
      },
      {
        name: 'createDate',
        title: this.translate.instant('Create date'),
        type: 'datetime',
        readonly: true
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.plan) {
      if (this.plan) {
        this.courses = this.plansService.getCourses(this.plan.id);
      }
    }
  }

  open(content: any): void {
    this.modal.open(content).result.then(
      () => {
        swal
          .fire({
            title: this.translate.instant('Wanna copy courses?'),
            text: this.translate.instant(
              'Your current courses gonna be erased'
            ),
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: this.translate.instant('Cancel'),
            confirmButtonText: this.translate.instant('Yes, copy them!')
          })
          .then(res => {
            if (res.value) {
              const ids = [];
              ids.push(this.plan.id);
              ids.push(this.selectedId);
              this.plansService.copyCourses(ids).subscribe(
                () => {
                  swal.fire(
                    this.translate.instant('Copied!'),
                    this.translate.instant('Courses copied succesfully'),
                    'success'
                  );
                  this.courses = this.plansService.getCourses(this.plan.id);
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
          });
      },
      () => {}
    );
  }

  createCourse(course: Course): void {
    course.plan = { id: this.plan.id, name: this.plan.name };
    this.coursesService.create(course).subscribe(
      res => {
        swal.fire(
          res.subject.name,
          this.translate.instant('Created item', {
            value: this.translate.instant('Course')
          }),
          'success'
        );
        this.courses = this.plansService.getCourses(this.plan.id);
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
        this.courses = this.plansService.getCourses(this.plan.id);
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
