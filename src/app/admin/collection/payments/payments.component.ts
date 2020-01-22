import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payments.model';
import { TableOptions } from '@skooltrak/custom-components';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass']
})
export class PaymentsComponent implements OnInit {
  payments: Observable<Payment[]>;
  table = new TableOptions();

  constructor(
    private paymentsServ: PaymentsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.table.columns = [
      {
        name: 'referenceNumber',
        title: this.translate.instant('Reference number')
      },
      { name: 'description', title: this.translate.instant('Description') },
      {
        name: 'paymentDate',
        title: this.translate.instant('Payment date'),
        type: 'datetime'
      },
      { name: 'method', title: this.translate.instant('Payment method') }
    ];
    this.payments = this.paymentsServ.getAll();
  }

}
