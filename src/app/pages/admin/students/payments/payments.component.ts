import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payments.model';
import { Student } from 'src/app/shared/models/students.model';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.sass'],
})
export class PaymentsComponent implements OnInit {
  @Input() student: Student;

  payments$: Observable<Payment[]>;
  constructor(
    private studentServ: StudentsService,
    private paymentServ: PaymentsService
  ) {}

  ngOnInit(): void {
    this.payments$ = this.studentServ.getPayments(this.student.id);
  }

  async deletePayment(payment: Payment) {
    const result = await Swal.fire({
      title: payment.description,
      text: 'Desea reversar este cargo?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonColor: '#3182ce',
      cancelButtonColor: '#718096',
      cancelButtonText: 'No, mantener',
      confirmButtonText: 'Sí, reversar',
    });
    if (result.isConfirmed) {
      this.paymentServ.delete(payment.id).subscribe({
        next: () => {
          this.payments$ = this.studentServ.getPayments(this.student.id);
          Swal.fire('Pago eliminado exitosamente', '', 'info');
        },
        error: (err) => console.error(err),
      });
    }
  }
}
