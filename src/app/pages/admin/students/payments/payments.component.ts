import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from 'projects/custom-components/src/public-api';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payments.model';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass']
})
export class PaymentsComponent implements OnInit {
  @Input() student: Student;

  payments: Observable<Payment[]>;
  table = new TableOptions();
  constructor(
    private studentServ: StudentsService,
    private translate: TranslocoService
  ) {}

  ngOnInit() {
    this.table.columns = [
      {
        name: 'referenceNumber',
        title: this.translate.translate('Reference number')
      },
      { name: 'description', title: this.translate.translate('Description') },
      {
        name: 'paymentDate',
        title: this.translate.translate('Payment date'),
        type: 'datetime'
      },
      { name: 'method', title: this.translate.translate('Payment method') },
      { name: 'amount', title: this.translate.translate('Amount'), type: 'money' }
    ];
    this.payments = this.studentServ.getPayments(this.student.id);
  }
}
