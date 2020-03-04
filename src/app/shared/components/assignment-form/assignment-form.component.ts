import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Assignment, AssignmentType } from '../../models/assignments.model';
import { AssignmentTypesService } from '../../services/assignmenttypes.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.sass']
})
export class AssignmentFormComponent implements OnInit {
  assignmentForm: FormGroup;
  assignment: Assignment;
  types: Observable<AssignmentType[]>;
  minDate: NgbDateStruct = { year: new Date().getFullYear(), month: 3, day: 1 };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31
  };
  constructor(
    public modal: NgbActiveModal,
    private typesService: AssignmentTypesService,
    private session: SessionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.types = this.typesService.getAll();
    this.assignmentForm = this.fb.group({
      id: [this.assignment ? this.assignment.id : '', []],
      title: [
        this.assignment ? this.assignment.title : '',
        [Validators.required]
      ],
      dueDate: [this.assignment ? this.assignment.dueDate : undefined],
      startDate: [this.assignment ? this.assignment.startDate : undefined],
      description: [this.assignment ? this.assignment.description : '', []],
      type: [this.assignment ? this.assignment.type : undefined, []],
      course: [this.assignment ? this.assignment.course : undefined, []],
      group: [this.assignment ? this.assignment.group : undefined, []],
      teacher: [
        this.assignment
          ? this.assignment.teacher
          : this.session.currentUser.people[0]
      ]
    });
    if (!this.assignment) {
      this.assignmentForm.get('type').setValue(undefined);
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
