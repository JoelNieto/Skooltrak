import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.sass'],
})
export class GradeFormComponent implements OnInit {
  constructor(private modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
