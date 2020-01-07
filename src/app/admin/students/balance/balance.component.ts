import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Charge } from 'src/app/shared/models/charges.model';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent implements OnInit {
  @Input() student: Student;

  showPendings: boolean = false;

  charges: Observable<Charge[]>;
  dueTotal: Observable<number>;
  activeTotal: Observable<number>;
  totalDebt: Observable<number>;
  constructor(private studentServ: StudentsService) {}

  ngOnInit() {
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
}
