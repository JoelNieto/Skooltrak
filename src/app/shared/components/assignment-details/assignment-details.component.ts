import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Assignment } from '../../models/assignments.model';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.sass']
})
export class AssignmentDetailsComponent implements OnInit {
  @Input() assignment: Assignment;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }


}
