import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Assignment } from '../../models/assignments.model';

@Component({
  selector: 'skooltrak-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.sass'],
})
export class AssignmentDetailsComponent {
  @Input() assignment: Assignment;
  constructor(public modal: NgbActiveModal) {}
}
