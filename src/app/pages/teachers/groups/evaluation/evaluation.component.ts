import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { EvaluationArea } from 'src/app/shared/models/evaluation-areas.model';
import { Period } from 'src/app/shared/models/periods.model';
import { EvaluationValue } from 'src/app/shared/models/prescholar.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { PeriodsService } from 'src/app/shared/services/periods.service';
import { PreScholarService } from 'src/app/shared/services/prescholar.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.sass'],
})
export class EvaluationComponent implements OnInit, OnChanges {
  @Input() student: Student;
  @Input() plan: StudyPlan;
  @Input() group: ClassGroup;

  areas$: Observable<EvaluationArea[]>;
  periods$: Observable<Period[]>;
  items$: Observable<EvaluationValue[]>;
  constructor(
    private planService: StudyPlanService,
    private preScholarService: PreScholarService,
    private transloco: TranslocoService,
    private periodsService: PeriodsService
  ) {}

  ngOnInit(): void {
    this.areas$ = this.planService.getEvaluations(this.plan.id);
    this.periods$ = this.periodsService.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.student) {
      if (this.student) {
        this.items$ = this.preScholarService.getValues(this.student.id);
      }
    }
  }

  setValue(areaId: string, itemId: string, periodId: string, value: string) {
    this.preScholarService
      .setValue({
        studentId: this.student.id,
        areaId,
        itemName: itemId,
        periodId,
        value,
      })
      .subscribe({
        next: () =>
          Swal.fire({
            title: this.transloco.translate('Updated value'),
            icon: 'success',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
          }),
        error: (err: Error) =>
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          ),
      });
  }
}
