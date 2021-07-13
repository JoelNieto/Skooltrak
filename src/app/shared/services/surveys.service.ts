import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Survey, SurveyAnswer } from '../models/surveys.model';

@Injectable({ providedIn: 'root' })
export class SurveysService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'Surveys/';
  }

  public getAll() {
    return this.http.get<Survey[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Survey>(`${this.url}${id}`);
  }

  public create(survey: Survey) {
    return this.http.post<Survey>(this.url, survey);
  }

  public answer(answer: SurveyAnswer) {
    return this.http.post(this.url + 'Answer', answer);
  }

  public getAnswers(id: string) {
    return this.http.get<SurveyAnswer[]>(`${this.url}${id}/Answers`, {
      context: withCache(),
    });
  }

  getCurrentSurveys() {
    return this.http.get<Survey[]>(environment.urlAPI + 'Users/Surveys');
  }

  public edit(id: string, survey: Survey) {
    return this.http.put(`${this.url}${id}`, survey);
  }
}
