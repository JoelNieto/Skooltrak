import { Injectable } from '@angular/core';

import { Survey, SurveyAnswer } from '../models/surveys.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class SurveysService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'Surveys';
  }

  public getAll() {
    return this.http.get<Survey[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Survey>(this.url, id);
  }

  public create(survey: Survey) {
    return this.http.post<Survey>(this.url, survey);
  }

  public answer(answer: SurveyAnswer) {
    return this.http.post(this.url + '/Answer', answer);
  }

  public getAnswers(id: string) {
    return this.http.get<SurveyAnswer[]>(`${this.url}/${id}/Answers`);
  }

  getCurrentSurveys() {
    return this.http.get<Survey[]>(this.conn.urlAPI + 'Users/Surveys');
  }

  public edit(id: string, survey: Survey) {
    return this.http.edit(this.url, id, survey);
  }
}
