import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/shared/models/grades.model';
import { Period } from 'src/app/shared/models/periods.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import Swal from 'sweetalert2';

import { GradesFormComponent } from '../grades-form/grades-form.component';

@Component({
  selector: 'skooltrak-closed-grades',
  templateUrl: './closed-grades.component.html',
  styleUrls: ['./closed-grades.component.sass'],
})
export class ClosedGradesComponent implements OnInit {
  @Input() course: Course;
  @Input() period: Period;
  @Input() admin: boolean;

  grades$: Observable<Grade[]>;
  constructor(
    private coursesService: CoursesService,
    private modal: NgbModal,
    private router: Router,
    private transloco: TranslocoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.grades$ = this.coursesService.getPeriodGrades(
      this.course.id,
      this.period.id
    );
  }

  showModal(grade: Grade): void {
    const modalRef = this.modal.open(GradesFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.grades$ = this.coursesService.getPeriodGrades(
        this.course.id,
        this.period.id
      );
    });
    modalRef.componentInstance.grade = grade;
    modalRef.componentInstance.locked = true;
    modalRef.componentInstance.course = this.course;
  }

  async openPeriod(): Promise<void> {
    const result = await Swal.fire<Promise<boolean>>({
      title: 'Desea abrir las notas para este trimestre?',
      text: 'Hasta que el docente no vuelva a cerrar este periodo, solo podrá agregar y/o editar notas en este periodo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: 'Sí, abrir',
    });

    if (result.isConfirmed) {
      this.coursesService.openPeriod(this.course.id, this.period).subscribe({
        next: () => {
          this.router.navigate(['./'], { relativeTo: this.route.parent });
          Swal.fire('Trimestre abierto exitosamente', '', 'success');
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
}
