import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Application, Charge } from 'src/app/shared/models/payments.model';
import { Student } from 'src/app/shared/models/students.model';

@Component({
  selector: 'skooltrak-payments-form',
  templateUrl: './payments-form.component.html',
  styleUrls: ['./payments-form.component.sass'],
})
export class PaymentsFormComponent implements OnInit {
  @Input() student: Student;
  @Input() charges$: Observable<Charge[]>;

  paymentForm: FormGroup;
  remaining: number;
  methods = [
    'Efectivo',
    'Depósito',
    'Cheque',
    'Transferencia',
    'Tarjeta de crédito',
    'Clave',
    'Nota de crédito',
  ];
  constructor(private fb: FormBuilder, public modal: NgbActiveModal) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      description: [''],
      referenceNumber: ['', [Validators.required]],
      method: ['', [Validators.required]],
      amount: [0, { validators: [Validators.required], updateOn: 'blur' }],
      applications: [[]],
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
    const amount = Number(value.target.value);
    let applications: Application[] =
      this.paymentForm.get('applications').value;

    if (applications.filter((x) => x.charge.id === charge.id).length) {
      if (amount > 0) {
        applications.filter((x) => x.charge.id === charge.id)[0].amount =
          amount;
      } else {
        applications = applications.filter((x) => x.charge.id !== charge.id);
      }
    } else {
      if (amount > 0) {
        applications.push({ charge, amount });
      }
    }
    this.remaining =
      this.paymentForm.get('amount').value -
      applications.reduce((sum, b) => sum + b.amount, 0);
    this.paymentForm.get('applications').setValue(applications);
  }
}
