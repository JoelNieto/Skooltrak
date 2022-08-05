import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payments.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'skooltrak-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
})
export class PaymentsComponent implements OnInit {
  payments$: Observable<Payment[]>;
  constructor(
    private session: SessionService,
    private studentsServ: StudentsService
  ) {}

  ngOnInit(): void {
    this.payments$ = this.studentsServ.getPayments(
      this.session.currentStudent.id
    );
  }
}
