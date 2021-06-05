import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { Grade } from 'src/app/shared/models/grades.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { GradesService } from 'src/app/shared/services/grades.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import Swal from 'sweetalert2';

import { GradesFormComponent } from '../grades-form/grades-form.component';

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.sass'],
})
export class CourseGradesComponent implements OnInit {
  @Input() course: Course;

  grades$: Observable<Grade[]>;
  periods$: Observable<Period[]>;
  active: number;
  constructor(
    private courseService: CoursesService,
    private gradesService: GradesService,
    private transloco: TranslocoService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.periods$ = this.storage.getFromStorage(StorageEnum.Periods);
    this.grades$ = this.courseService.getPeriodGrades(
      this.course.id,
      this.course.currentPeriod.id
    );
    this.active = this.course.currentPeriod.sort;
  }

  showClosePeriod(): boolean {
    return new Date(this.course.currentPeriod.endDate) <= new Date();
  }

  showModal() {
    const modalRef = this.modal.open(GradesFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.grades$ = this.courseService.getPeriodGrades(
        this.course.id,
        this.course.currentPeriod.id
      );
    });
    modalRef.componentInstance.course = this.course;
  }

  editGrade(grade: Grade) {
    const modalRef = this.modal.open(GradesFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.grades$ = this.courseService.getPeriodGrades(
        this.course.id,
        this.course.currentPeriod.id
      );
    });
    modalRef.componentInstance.grade = grade;
    modalRef.componentInstance.course = this.course;
  }

  async closePeriod(course: Course) {
    const result = await Swal.fire<Promise<boolean>>({
      title: 'Desea cerrar las notas para este trimestre?',
      text:
        // eslint-disable-next-line max-len
        'Este cambio será irreversible. Una vez cerrado el periodo, las calificaciones actuales serán almacenadas y podrá ingresar las notas del siguiente periodo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Sí, cerrar'),
    });

    if (result.isConfirmed) {
      this.courseService.closePeriod(course).subscribe(
        () => {
          this.router.navigate(['./'], { relativeTo: this.route.parent });
          Swal.fire('Trimestre cerrado exitosamente', '', 'success');
        },
        (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        }
      );
    }
  }

  async deleteGrade(grade: Grade) {
    const result = await Swal.fire<Promise<boolean>>({
      title: grade.title,
      text: 'Va a eliminar esta calificación. No podrá ser reversado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    });
    if (result.value) {
      this.gradesService.delete(grade.id).subscribe(
        () => {
          this.grades$ = this.courseService.getGrades(this.course.id);
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Grade'),
            }),
            '',
            'info'
          );
        },
        (err) => console.error(err)
      );
    }
  }
}
