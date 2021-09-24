import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableOptions } from '@skooltrak/custom-components';
import { Observable } from 'rxjs';
import { StudyPlan } from 'src/app/shared/models/studyplans.model';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';

@Component({
  selector: 'skooltrak-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  plan$: Observable<StudyPlan>;
  skillsTable = new TableOptions();
  constructor(
    private route: ActivatedRoute,
    private planServ: StudyPlanService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.plan$ = this.planServ.get(params.id);
      },
      (err) => console.error(err)
    );
  }
}
