import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/shared/models/grades.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { GradesService } from 'src/app/shared/services/grades.service';
import Swal from 'sweetalert2';

import { GradesFormComponent } from '../grades-form/grades-form.component';

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.sass'],
})
export class CourseGradesComponent implements OnInit {
  @Input() course: Course;

  $grades: Observable<Grade[]>;
  constructor(
    private courseGrades: CoursesService,
    private gradesService: GradesService,
    private transloco: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.$grades = this.courseGrades.getGrades(this.course.id);
  }

  showModal() {
    const modalRef = this.modal.open(GradesFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.$grades = this.courseGrades.getGrades(this.course.id);
    });
    modalRef.componentInstance.course = this.course;
  }

  editGrade(grade: Grade) {
    const modalRef = this.modal.open(GradesFormComponent, { size: 'lg' });
    modalRef.result.then(() => {
      this.$grades = this.courseGrades.getGrades(this.course.id);
    });
    modalRef.componentInstance.grade = grade;
    modalRef.componentInstance.course = this.course;
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
      this.gradesService.delete(grade.id).subscribe(() => {
        this.$grades = this.courseGrades.getGrades(this.course.id);
        Swal.fire(
          this.transloco.translate('Deleted item', {
            value: this.transloco.translate('Grade'),
          }),
          '',
          'info'
        );
      });
    }
  }
}
