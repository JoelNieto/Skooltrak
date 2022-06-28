import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Grade } from '../../models/grades.model';
import { Period } from '../../models/periods.model';
import { Course } from '../../models/studyplans.model';
import { CoursesService } from '../../services/courses.service';
import { GradesService } from '../../services/grades.service';
import { PeriodsService } from '../../services/periods.service';
import { GradesFormComponent } from './grades-form/grades-form.component';

@Component({
  selector: 'skooltrak-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.sass'],
})
export class CourseGradesComponent implements OnInit {
  @Input() course: Course;
  @Input() admin: boolean;

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
    private periodsService: PeriodsService
  ) {}

  ngOnInit(): void {
    this.periods$ = this.periodsService.getAll();
    this.grades$ = this.courseService.getPeriodGrades(
      this.course.id,
      this.course.currentPeriod.id
    );
    this.active = this.course.currentPeriod.sort;
  }

  showClosePeriod(): boolean {
    return new Date(this.course.currentPeriod.endDate) <= new Date();
  }

  showModal(): void {
    const modalRef = this.modal.open(GradesFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.grades$ = this.courseService.getPeriodGrades(
        this.course.id,
        this.course.currentPeriod.id
      );
    });
    modalRef.componentInstance.course = this.course;
  }

  editGrade(grade: Grade): void {
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

  async closePeriod(course: Course): Promise<void> {
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
      this.courseService.closePeriod(course).subscribe({
        next: () => {
          this.router.navigate(['./'], { relativeTo: this.route.parent });
          Swal.fire('Trimestre cerrado exitosamente', '', 'success');
        },
        error: (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        },
      });
    }
  }

  async deleteGrade(grade: Grade): Promise<void> {
    const result = await Swal.fire<Promise<boolean>>({
      title: grade.title,
      text: 'Va a eliminar esta calificación. No podrá ser reversado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    });
    if (result.isConfirmed) {
      this.gradesService.delete(grade.id).subscribe({
        next: () => {
          this.grades$ = this.courseService.getGrades(this.course.id);
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Grade'),
            }),
            '',
            'info'
          );
        },
        error: (err) => console.error(err),
      });
    }
  }
}
