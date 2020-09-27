import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ExamAssignation } from 'src/app/shared/models/exams.model';
import { ExamAssignationsService } from 'src/app/shared/services/exam-assignations.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { AssignationComponent } from '../assignation/assignation.component';

@Component({
  selector: 'app-assignations',
  templateUrl: './assignations.component.html',
  styleUrls: ['./assignations.component.sass'],
})
export class AssignationsComponent implements OnInit {
  assignations: Observable<ExamAssignation[]>;
  constructor(
    private session: SessionService,
    private teachersService: TeachersService,
    private modal: NgbModal,
    private assignationService: ExamAssignationsService
  ) {}

  ngOnInit(): void {
    this.assignations = this.teachersService.getExamAssignations(
      this.session.currentTeacher.id
    );
  }

  editAssignation(assignation: ExamAssignation) {
    const modalRef = this.modal.open(AssignationComponent, { size: 'lg' });
    modalRef.componentInstance.assignation = assignation;
  }
}
