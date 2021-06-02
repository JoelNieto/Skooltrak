import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Exam, ExamAssignation } from 'src/app/shared/models/exams.model';
import { ExamsService } from 'src/app/shared/services/exams.service';

import { AssignationComponent } from '../assignation/assignation.component';

@Component({
  selector: 'app-exam-assignations',
  templateUrl: './exam-assignations.component.html',
  styleUrls: ['./exam-assignations.component.sass'],
})
export class ExamAssignationsComponent implements OnInit {
  @Input() exam: Exam;
  assignations$: Observable<ExamAssignation[]>;
  constructor(private examsService: ExamsService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.assignations$ = this.examsService.getAssignations(this.exam.id);
  }

  editAssignation(assignation: ExamAssignation) {
    const modalRef = this.modal.open(AssignationComponent, { size: 'lg' });
    modalRef.componentInstance.assignation = assignation;
  }
}
