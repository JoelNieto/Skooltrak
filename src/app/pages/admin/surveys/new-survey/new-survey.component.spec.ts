import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { SurveysMock } from 'src/app/shared/mocks/surveys.mock';
import { SurveysService } from 'src/app/shared/services/surveys.service';

import { NewSurveyComponent } from './new-survey.component';

fdescribe('NewSurveyComponent', () => {
  let component: NewSurveyComponent;
  let fixture: ComponentFixture<NewSurveyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          TranslocoTestingModule,
        ],
        providers: [SurveysService],
        declarations: [NewSurveyComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('create survey', () => {
    it('should success', (done) => {
      const surveys = TestBed.inject(SurveysService);
      const router = TestBed.inject(Router);
      spyOn(surveys, 'create').and.returnValue(of(SurveysMock.sample));
      spyOn(router, 'navigate');
      component.createSurvey(SurveysMock.sample);
      expect(router.navigate).toHaveBeenCalled();
      done();
    });
    it('should fails', (done) => {
      const surveys = TestBed.inject(SurveysService);
      const router = TestBed.inject(Router);
      spyOn(surveys, 'create').and.returnValue(throwError(() => new Error('')));
      spyOn(router, 'navigate');
      component.createSurvey(SurveysMock.sample);
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });
});
