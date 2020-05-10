import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/shared/models/surveys.model';
import { SurveysService } from 'src/app/shared/services/surveys.service';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.sass'],
})
export class SurveyDetailsComponent implements OnInit {
  survey$: Observable<Survey>;
  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveysService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.survey$ = this.surveyService.get(params.id);
    });
  }
}
