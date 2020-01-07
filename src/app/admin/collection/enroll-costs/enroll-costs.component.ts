import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableOptions } from 'custom-components';
import { Observable } from 'rxjs';
import { StudyPlan } from 'src/app/shared/models/studyplans.model';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enroll-costs',
  templateUrl: './enroll-costs.component.html',
  styleUrls: ['./enroll-costs.component.sass']
})
export class EnrollCostsComponent implements OnInit {
  plans: Observable<StudyPlan[]>;
  table = new TableOptions();
  currentPlan: StudyPlan;
  sourceId: string;
  constructor(
    private plansServ: StudyPlanService,
    private translate: TranslateService,
    public modal: NgbModal
  ) {}

  ngOnInit() {
    this.table.searcheable = false;
    this.table.columns = [
      {
        name: 'description',
        title: this.translate.instant('Description'),
        required: true
      },
      {
        name: 'cost',
        title: this.translate.instant('Cost'),
        type: 'money',
        required: true
      }
    ];
    this.plans = this.plansServ.getAll();
  }

  total() {
    return this.currentPlan.enrollCharges.reduce((sum, charge) => sum + charge.cost, 0);
  }

  addCharge(item: { description: string; cost: number }) {
    this.currentPlan.enrollCharges.push(item);
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(() => {
      Swal.fire(
        item.description,
        this.translate.instant('Created item', {
          value: this.translate.instant('Charge')
        }),
        'success'
      );
    });
  }

  open(content: any): void {
    this.modal.open(content).result.then(() => {
      Swal.fire({
        title: this.translate.instant('Wanna copy charges?'),
        text: this.translate.instant('Your current charges gonna be erased'),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.translate.instant('Cancel'),
        confirmButtonText: this.translate.instant('Yes, copy them!')
      }).then(res => {
        if (res.value) {
          const ids = [];
          ids.push(this.currentPlan.id);
          ids.push(this.sourceId);
          this.plansServ.copyCharges(ids).subscribe(
            () => {
              Swal.fire(
                this.translate.instant('Copied!'),
                this.translate.instant('Courses copied succesfully'),
                'success'
              );
              this.plans = this.plansServ.getAll();
            },
            (err: Error) => {
              Swal.fire(
                this.translate.instant('Something went wrong'),
                this.translate.instant(err.message),
                'error'
              );
            }
          );
        }
      });
    });
  }

  editCharge(item: { description: string; cost: number }) {
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(() => {
      Swal.fire(
        item.description,
        this.translate.instant('Updated item', {
          value: this.translate.instant('Charge')
        }),
        'success'
      );
    });
  }

  deleteCharge(item: any) {
    console.log(this.currentPlan);
    console.log(item);
    this.plansServ.edit(this.currentPlan.id, this.currentPlan).subscribe(() => {
      Swal.fire(
        '',
        this.translate.instant('Deleted item', {
          value: this.translate.instant('Charge')
        }),
        'info'
      );
    });
  }
}
