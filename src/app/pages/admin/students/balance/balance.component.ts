import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge } from 'src/app/shared/models/payments.model';
import { Student } from 'src/app/shared/models/students.model';
import { ChargesService } from 'src/app/shared/services/charges.service';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import Swal from 'sweetalert2';

import { ChargesFormComponent } from '../charges-form/charges-form.component';
import { PaymentsFormComponent } from '../payments-form/payments-form.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass'],
})
export class BalanceComponent implements OnInit {
  @Input() student: Student;

  showPendings = false;

  charges: Observable<Charge[]>;
  dueTotal: Observable<number>;
  activeTotal: Observable<number>;
  totalDebt: Observable<number>;
  constructor(
    private studentServ: StudentsService,
    private modal: NgbModal,
    private translate: TranslocoService,
    private paymentServ: PaymentsService,
    private changesServ: ChargesService
  ) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.charges = this.studentServ.getCharges(this.student.id);
    this.dueTotal = this.charges.pipe(
      map((charges) =>
        charges
          .filter((x) => x.status === 'Due')
          .reduce((sum, charge) => sum + charge.balance, 0)
      )
    );

    this.totalDebt = this.charges.pipe(
      map((charges) =>
        charges
          .filter((x) => x.status === 'Active' || x.status === 'Due')
          .reduce((sum, charge) => sum + charge.balance, 0)
      )
    );

    this.activeTotal = this.charges.pipe(
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

  doPayment() {
    const modalRef = this.modal.open(PaymentsFormComponent, { size: 'lg' });
    modalRef.result.then((res) => {
      this.paymentServ.create(res).subscribe(
        () => {
          this.getValues();
          Swal.fire(
            this.translate.translate('Payment registered succesfully'),
            this.translate.translate('Balance will be updated'),
            'success'
          );
        },
        (err: Error) => {
          Swal.fire(
            this.translate.translate('Something went wrong'),
            this.translate.translate(err.message),
            'error'
          );
        }
      );
    });
    modalRef.componentInstance.student = this.student;
    modalRef.componentInstance.charges = this.charges;
  }

  createCharge() {
    const modalRef = this.modal.open(ChargesFormComponent);
    modalRef.result.then((res) => {
      this.changesServ.create(res).subscribe(
        () => {
          this.getValues();
          Swal.fire(
            this.translate.translate('Charge registered succesfully'),
            this.translate.translate('Balance will be updated'),
            'success'
          );
        },
        (err: Error) => {
          Swal.fire(
            this.translate.translate('Something went wrong'),
            this.translate.translate(err.message),
            'error'
          );
        }
      );
    });
    modalRef.componentInstance.student = this.student;
  }
}
