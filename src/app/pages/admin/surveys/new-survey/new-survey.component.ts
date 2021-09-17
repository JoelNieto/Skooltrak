import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Survey } from 'src/app/shared/models/surveys.model';
import { SurveysService } from 'src/app/shared/services/surveys.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.sass'],
})
export class NewSurveyComponent {
  constructor(
    private surveyService: SurveysService,
    private route: ActivatedRoute,
    private router: Router,
    private transloco: TranslocoService
  ) {}

  createSurvey(survey: Survey) {
    this.surveyService.create(survey).subscribe(
      (res) => {
        Swal.fire(
          res.title,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('Survey'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.message),
          'error'
        );
      }
    );
  }
}
