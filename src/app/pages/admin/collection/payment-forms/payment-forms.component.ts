import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsSearchComponent } from 'src/app/shared/components/students-search/students-search.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/shared/models/students.model';

@Component({
  selector: 'app-payment-forms',
  templateUrl: './payment-forms.component.html',
  styleUrls: ['./payment-forms.component.sass']
})
export class PaymentFormsComponent implements OnInit {
  selected: Student;
  selectedName: string;
  paymentForm: FormGroup;

  methods = [
    'Efectivo',
    'Cheque',
    'Transferencia',
    'Tarjeta de crédito',
    'Clave'
  ];
  constructor(private modal: NgbModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.paymentForm = this.fb.group({
      description: [''],
      reference: ['', [Validators.required]],
      method: ['', [Validators.required]],
      student: ['', [Validators.required]],
      paymentDate: ['', [Validators.required]]
    });
  }

  showModal() {
    this.modal.open(StudentsSearchComponent, { size: 'xl' }).result.then(
      result => {
        this.selected = result;
        this.selectedName = this.selected.fullName;
      },
      reason => {}
    );
  }
}
