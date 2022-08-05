import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'skooltrak-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.sass'],
})
export class GradeFormComponent {
  constructor(private modal: NgbActiveModal) {}
}
