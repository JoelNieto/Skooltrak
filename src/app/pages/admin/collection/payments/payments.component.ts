import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payments.model';
import { PaymentsService } from 'src/app/shared/services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
})
export class PaymentsComponent implements OnInit {
  payments$: Observable<Payment[]>;
  table = new TableOptions();

  constructor(
    private paymentsServ: PaymentsService,
    private translate: TranslocoService
  ) {}

  ngOnInit() {
    this.table.exportToCSV = true;
    this.table.columns = [
      {
        name: 'referenceNumber',
        title: this.translate.translate('Reference number'),
      },
      {
        name: 'student.name',
        title: this.translate.translate('Student'),
        filterable: true,
      },
      {
        name: 'description',
        title: this.translate.translate('Description'),
        filterable: true,
      },
      {
        name: 'paymentDate',
        title: this.translate.translate('Payment date'),
        type: 'date',
      },
      { name: 'method', title: this.translate.translate('Payment method') },
      {
        name: 'amount',
        title: this.translate.translate('Amount'),
        type: 'money',
      },
    ];
    this.payments$ = this.paymentsServ.getAll();
  }
}
