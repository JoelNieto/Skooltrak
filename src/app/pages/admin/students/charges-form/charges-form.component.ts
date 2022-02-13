import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/shared/models/students.model';

@Component({
  selector: 'skooltrak-charges-form',
  templateUrl: './charges-form.component.html',
  styleUrls: ['./charges-form.component.sass'],
})
export class ChargesFormComponent implements OnInit {
  @Input() student: Student;

  chargeForm: FormGroup;
  minDate: NgbDateStruct = { year: new Date().getFullYear(), month: 1, day: 1 };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31,
  };

  constructor(private fb: FormBuilder, public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.chargeForm = this.fb.group({
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      student: [
        { id: this.student.id, name: this.student.fullName },
        [Validators.required],
      ],
    });
  }
}
