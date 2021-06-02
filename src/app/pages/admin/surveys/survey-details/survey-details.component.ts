import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Survey } from 'src/app/shared/models/surveys.model';
import { SurveysService } from 'src/app/shared/services/surveys.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.sass'],
})
export class SurveyDetailsComponent implements OnInit {
  survey$: Observable<Survey>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveysService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.survey$ = this.surveyService.get(params.id);
      },
      (err) => console.log(err)
    );
  }

  updateSurvey(survey: Survey) {
    this.surveyService.edit(survey.id, survey).subscribe(
      () => {
        Swal.fire(
          survey.title,
          this.transloco.translate('Updated itemf', {
            value: this.transloco.translate('Survey'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err) => console.log(err)
    );
  }
}
