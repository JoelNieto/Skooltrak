import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/shared/models/students.model';
import { Payment } from 'src/app/shared/models/payments.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Charge } from 'src/app/shared/models/charges.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payments-form',
  templateUrl: './payments-form.component.html',
  styleUrls: ['./payments-form.component.sass']
})
export class PaymentsFormComponent implements OnInit {
  @Input() student: Student;
  @Input() payment: Payment;
  @Input() charges: Observable<Charge[]>;

  paymentForm: FormGroup;
  methods = [
    'Efectivo',
    'Cheque',
    'Transferencia',
    'Tarjeta de crédito',
    'Clave'
  ];
  constructor(private fb: FormBuilder, public modal: NgbActiveModal) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      description: [''],
      referenceNumber: ['', [Validators.required]],
      method: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      student: [
        { id: this.student.id, name: this.student.fullName },
        [Validators.required]
      ],
      paymentDate: ['', [Validators.required]]
    });
  }
}
