import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge } from 'src/app/shared/models/charges.model';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import { PaymentsFormComponent } from '../payments-form/payments-form.component';
import { PaymentsService } from 'src/app/shared/services/payments.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent implements OnInit {
  @Input() student: Student;

  showPendings = false;

  charges: Observable<Charge[]>;
  dueTotal: Observable<number>;
  activeTotal: Observable<number>;
  totalDebt: Observable<number>;
  constructor(private studentServ: StudentsService, private modal: NgbModal, private paymentServ: PaymentsService) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.charges = this.studentServ.getCharges(this.student.id);
    this.dueTotal = this.charges.pipe(
      map(charges => {
        return charges
          .filter(x => x.status === 'Due')
          .reduce((sum, charge) => sum + charge.balance, 0);
      })
    );

    this.totalDebt = this.charges.pipe(
      map(charges => {
        return charges
          .filter(x => x.status === 'Active' || x.status === 'Due')
          .reduce((sum, charge) => sum + charge.balance, 0);
      })
    );

    this.activeTotal = this.charges.pipe(
      map(charges => {
        return charges
          .filter(x => x.status === 'Active')
          .reduce((sum, charge) => sum + charge.balance, 0);
      })
    );
  }

  toggleShowPendings() {
    this.showPendings = !this.showPendings;
  }

  doPayment() {
    const modalRef = this.modal.open(PaymentsFormComponent, { size: 'lg' });
    modalRef.result.then(res => {
      this.paymentServ.create(res).subscribe((response) => {
        this.getValues();
      });
    });
    modalRef.componentInstance.student = this.student;
    modalRef.componentInstance.charges = this.charges;
  }
}
