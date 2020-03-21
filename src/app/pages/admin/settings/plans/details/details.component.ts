import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudyPlan } from 'src/app/shared/models/studyplans.model';
import { StudyPlanService } from 'src/app/shared/services/study-plans.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  plan: Observable<StudyPlan>;
  plans: Observable<StudyPlan[]>;
  constructor(
    private route: ActivatedRoute,
    private planServ: StudyPlanService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.plan = this.planServ.get(params.id);
    });
  }
}
