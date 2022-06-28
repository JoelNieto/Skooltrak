import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
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
  selector: 'skooltrak-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent implements OnInit, OnChanges {
  @Input() plan: StudyPlan;
  courses$: Observable<Course[]>;
  plans$: Observable<StudyPlan[]>;
  table = new TableOptions();
  selectedId: string = undefined;
  constructor(
    private coursesService: CoursesService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
    private plansService: StudyPlanService,
    private translate: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.table.searchable = false;
    this.plans$ = this.plansService
      .getAll()
      .pipe(map((plans) => plans.filter((x) => x.id !== this.plan.id)));
    this.table.columns = [
      {
        name: 'subject',
        title: this.translate.translate('Subject'),
        type: 'object',
        asyncList: this.subjectsService.getAll(),
        required: true,
      },
      {
        name: 'parentSubject',
        title: this.translate.translate('Parent subject'),
        type: 'object',
        asyncList: this.subjectsService.getAll(),
        required: false,
      },
      {
        name: 'weeklyHours',
        title: this.translate.translate('Weekly Hours'),
        type: 'number',
        required: true,
      },
      {
        name: 'teachers',
        title: this.translate.translate('Teachers'),
        asyncList: this.teachersService.getAll(),
        type: 'array',
        required: true,
        objectText: 'name',
      },
      {
        name: 'createDate',
        title: this.translate.translate('Create date'),
        type: 'datetime',
        readonly: true,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.plan) {
      if (this.plan) {
        this.courses$ = this.plansService.getCourses(this.plan.id);
      }
    }
  }

  open(content: any): void {
    this.modal.open(content).result.then(
      () => {
        swal
          .fire({
            title: this.translate.translate('Wanna copy courses?'),
            text: this.translate.translate(
              'Your current courses gonna be erased'
            ),
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: this.translate.translate('Cancel'),
            confirmButtonText: this.translate.translate('Yes, copy them!'),
          })
          .then((res) => {
            if (res.value) {
              const ids = [];
              ids.push(this.plan.id);
              ids.push(this.selectedId);
              this.plansService.copyCourses(ids).subscribe({
                next: () => {
                  swal.fire(
                    this.translate.translate('Copied!'),
                    this.translate.translate('Courses copied succesfully'),
                    'success'
                  );
                  this.courses$ = this.plansService.getCourses(this.plan.id);
                },
                error: (err: Error) => {
                  swal.fire(
                    this.translate.translate('Something went wrong'),
                    this.translate.translate(err.message),
                    'error'
                  );
                },
              });
            }
          });
      },
      () => {}
    );
  }

  createCourse(course: Course): void {
    course.plan = this.plan;
    this.coursesService.create(course).subscribe({
      next: (res) => {
        swal.fire(
          res.subject.name,
          this.translate.translate('Created item', {
            value: this.translate.translate('Course'),
          }),
          'success'
        );
        this.courses$ = this.plansService.getCourses(this.plan.id);
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }

  editCourse(course: Course): void {
    this.coursesService.edit(course.id, course).subscribe({
      next: () => {
        swal.fire(
          course.subject.name,
          this.translate.translate('Updated item', {
            value: this.translate.translate('Course'),
          }),
          'success'
        );
        this.courses$ = this.plansService.getCourses(this.plan.id);
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }

  deleteCourse(id: string) {
    this.coursesService.delete(id).subscribe({
      next: () => {
        swal.fire(
          this.translate.translate('Deleted item', {
            value: this.translate.translate('Course'),
          }),
          '',
          'success'
        );
      },
      error: (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.message),
          'error'
        );
      },
    });
  }
}
