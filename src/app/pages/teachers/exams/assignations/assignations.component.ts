import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamAssignation } from 'src/app/shared/models/exams.model';
import { ExamAssignationsService } from 'src/app/shared/services/exam-assignations.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

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
    private assignationService: ExamAssignationsService
  ) {}

  ngOnInit(): void {
    this.assignations = this.teachersService.getExamAssignations(this.session.currentTeacher.id);
  }
}
