import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ExamAssignation } from 'src/app/shared/models/exams.model';
import { ExamAssignationsService } from 'src/app/shared/services/exam-assignations.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

import { AssignationComponent } from '../assignation/assignation.component';

@Component({
  selector: 'skooltrak-assignations',
  templateUrl: './assignations.component.html',
  styleUrls: ['./assignations.component.sass'],
})
export class AssignationsComponent implements OnInit {
  assignations$: Observable<ExamAssignation[]>;

  constructor(
    private session: SessionService,
    private teachersService: TeachersService,
    private assignationsService: ExamAssignationsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.assignations$ = this.teachersService.getExamAssignations(
      this.session.currentTeacher.id
    );
  }

  editAssignation(assignation: ExamAssignation) {
    const modalRef = this.modal.open(AssignationComponent, { size: 'lg' });
    modalRef.componentInstance.assignation = assignation;
  }

  async deleteAssignation(assignation: ExamAssignation) {
    const resp = await Swal.fire<Promise<boolean>>({
      title: `Borrar ${assignation.title}?`,
      // eslint-disable-next-line max-len
      text: 'Está seguro de eliminar esta asignación?. De hacerlo así, se eliminarán todas las respuestas de los estudiantes a esta asignación',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      icon: 'warning',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
    });
    if (resp.isConfirmed) {
      this.assignationsService.delete(assignation.id).subscribe({
        next: () => {
          Swal.fire('Asignación eliminada correctamente', '', 'info');
          this.assignations$ = this.teachersService.getExamAssignations(
            this.session.currentTeacher.id
          );
        },
        error: (err) => console.error(err),
      });
    }
  }
}
