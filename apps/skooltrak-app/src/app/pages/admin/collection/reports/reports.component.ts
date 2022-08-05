import { Component, OnInit } from '@angular/core';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { StudentBalance } from 'src/app/shared/models/collection-report.model';
import { PaymentsService } from 'src/app/shared/services/payments.service';

@Component({
  selector: 'skooltrak-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass'],
})
export class ReportsComponent implements OnInit {
  balances$: Observable<StudentBalance[]>;
  table = new TableOptions();
  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.table.exportToCSV = true;
    this.table.lookup = true;
    this.table.columns = [
      {
        name: 'student',
        title: 'Estudiante',
        type: 'object',
        filterable: true,
      },
      { name: 'group', title: 'Grupo', type: 'object', lookup: true },
      { name: 'plan', title: 'Nivel', type: 'object', lookup: true },
      { name: 'dueAmount', title: 'Vencido', type: 'money' },
      { name: 'currentAmount', title: 'Saldo corriente', type: 'money' },
    ];
    this.balances$ = this.paymentsService.getBalances();
  }
}
