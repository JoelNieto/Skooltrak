import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Charge } from 'src/app/shared/models/charges.model';
import { Payment } from 'src/app/shared/models/payments.model';
import { Student } from 'src/app/shared/models/students.model';

@Component({
  selector: 'app-payments-form',
  templateUrl: './payments-form.component.html',
  styleUrls: ['./payments-form.component.sass'],
})
export class PaymentsFormComponent implements OnInit {
  @Input() student: Student;
  @Input() payment: Payment;
  @Input() charges: Observable<Charge[]>;

  paymentForm: FormGroup;
  remaining: number;
  methods = [
    'Efectivo',
    'Cheque',
    'Transferencia',
    'Tarjeta de crédito',
    'Clave',
    'Nota de crédito',
  ];
  constructor(private fb: FormBuilder, public modal: NgbActiveModal) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      description: [''],
      referenceNumber: ['', [Validators.required]],
      method: ['', [Validators.required]],
      amount: [0, { validators: [Validators.required], updateOn: 'blur' }],
      student: [
        { id: this.student.id, name: this.student.fullName },
        [Validators.required],
      ],
      paymentDate: ['', [Validators.required]],
    });
  }

  getAmount() {
    this.remaining = this.paymentForm.get('amount').value;
  }

  validate(charge: Charge, value: any) {
    let amount: number = value.target.value;
    if (amount > this.remaining) {
      value.target.value = this.remaining;
      amount = this.remaining;
    }
    if (amount > charge.balance) {
      value.target.value = charge.balance;
      amount = charge.balance;
    }

  }

  setValue(charge: Charge, value: any) {
    const amount: number = value.target.value;
    this.remaining = this.remaining - amount;
  }
}
