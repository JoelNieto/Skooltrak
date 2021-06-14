import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { StorageEnum } from 'src/app/shared/enums/storage.enum';
import { EvaluationArea } from 'src/app/shared/models/evaluation-areas.model';
import { Period } from 'src/app/shared/models/periods.model';
import { EvaluationValue } from 'src/app/shared/models/prescholar.model';
import { Student } from 'src/app/shared/models/students.model';
import { ClassGroup, StudyPlan } from 'src/app/shared/models/studyplans.model';
import { PreScholarService } from 'src/app/shared/services/prescholar.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluation',
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
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.areas$ = this.planService.getEvaluations(this.plan.id);
    this.periods$ = this.storage.getFromStorage<Period[]>(StorageEnum.Periods);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.student) {
      if (this.student) {
        this.items$ = this.preScholarService.getValues(this.student.id);

        // this.studentsService
        //   .getEvaluations(this.student.id)
        //   .pipe(
        //     mergeAll(),
        //     groupBy((item) => item.area.id),
        //     mergeMap((group$) => group$.pipe(toArray()))
        //   )
        //   .subscribe(
        //     (res) => console.info(res),
        //     () => {}
        //   );
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
      .subscribe(
        () =>
          Swal.fire({
            title: this.transloco.translate('Updated value'),
            icon: 'success',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
          }),
        (err: Error) =>
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          )
      );
  }
}
