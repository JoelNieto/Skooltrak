import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { QuizAssignation } from 'src/app/shared/models/quizes.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { AssignationComponent } from '../assignation/assignation.component';

@Component({
  selector: 'skooltrak-assignations',
  templateUrl: './assignations.component.html',
  styleUrls: ['./assignations.component.sass'],
})
export class AssignationsComponent implements OnInit {
  assignations$: Observable<QuizAssignation[]>;
  constructor(
    private session: SessionService,
    private teacherService: TeachersService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.assignations$ = this.teacherService.getQuizAssignations(
      this.session.currentTeacher.id
    );
  }

  editAssignation(assignation: QuizAssignation) {
    const modalRef = this.modal.open(AssignationComponent, { size: 'lg' });
    modalRef.componentInstance.assignation = assignation;
  }
}
