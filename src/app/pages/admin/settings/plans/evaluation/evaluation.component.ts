import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { EvaluationArea } from 'src/app/shared/models/evaluation-areas.model';
import { StudyPlan } from 'src/app/shared/models/studyplans.model';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import swal from 'sweetalert2';

import { EvaluationFormComponent } from '../evaluation-form/evaluation-form.component';

@Component({
  selector: 'skooltrak-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.sass'],
})
export class EvaluationComponent implements OnInit {
  @Input() plan: StudyPlan;

  areas$: Observable<EvaluationArea[]>;
  table = new TableOptions();
  constructor(
    private plansService: StudyPlanService,
    private modal: NgbModal,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.table.columns = [
      { name: 'name', title: this.transloco.translate('Name') },
      { name: 'description', title: this.transloco.translate('Description') },
    ];
    this.areas$ = this.plansService.getEvaluations(this.plan.id);
  }

  public createArea() {
    const modalRef = this.modal.open(EvaluationFormComponent, { size: 'lg' });
    modalRef.result.then((result: EvaluationArea) => {
      this.plansService.addEvaluationArea(this.plan.id, result).subscribe(
        (res) => {
          swal.fire('Área creada exitosamente', res.name, 'success');
          this.areas$ = this.plansService.getEvaluations(this.plan.id);
        },
        (err: Error) => {
          swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        }
      );
    });
  }

  public editArea(area: EvaluationArea) {
    const modalRef = this.modal.open(EvaluationFormComponent, { size: 'lg' });

    modalRef.result.then((result: EvaluationArea) => {
      this.plansService.editEvaluationArea(result.id, result).subscribe(
        () => {
          swal.fire('Área editada exitosamente', result.name, 'success');
          this.areas$ = this.plansService.getEvaluations(this.plan.id);
        },
        (err: Error) => {
          swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        }
      );
    });
    modalRef.componentInstance.area = area;
  }

  public deleteArea(id: string) {
    this.plansService.deleteEvaluationArea(id).subscribe(
      () => {
        swal.fire('Área eliminada exitosamente', '', 'success');
        this.areas$ = this.plansService.getEvaluations(this.plan.id);
      },
      (err: Error) => {
        swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      }
    );
  }
}
