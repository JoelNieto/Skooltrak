import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge } from 'src/app/shared/models/payments.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass'],
})
export class BalanceComponent implements OnInit {
  showPendings = false;

  charges$: Observable<Charge[]>;
  dueTotal$: Observable<number>;
  activeTotal$: Observable<number>;
  totalDebt$: Observable<number>;
  constructor(
    private session: SessionService,
    private studentsServ: StudentsService
  ) {}

  ngOnInit(): void {
    this.getValues();
  }

  getValues() {
    this.charges$ = this.studentsServ.getCharges(
      this.session.currentStudent.id
    );
    this.dueTotal$ = this.charges$.pipe(
      map((charges) =>
        charges
          .filter((x) => x.status === 'Due')
          .reduce((sum, charge) => sum + charge.balance, 0)
      )
    );

    this.totalDebt$ = this.charges$.pipe(
      map((charges) =>
        charges
          .filter((x) => x.status === 'Active' || x.status === 'Due')
          .reduce((sum, charge) => sum + charge.balance, 0)
      )
    );
    this.activeTotal$ = this.charges$.pipe(
      map((charges) =>
        charges
          .filter((x) => x.status === 'Active')
          .reduce((sum, charge) => sum + charge.balance, 0)
      )
    );
  }

  toggleShowPendings() {
    this.showPendings = !this.showPendings;
  }
}
