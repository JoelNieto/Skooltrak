import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { Skill } from '../models/skills.model';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'skills/';
  }

  getAll() {
    return this.http.get<Skill[]>(this.url, { context: withCache() });
  }

  get(id: string) {
    return this.http.get<Skill>(`${this.url}${id}`);
  }

  create(skill: Skill) {
    return this.http.post<Skill>(this.url, skill);
  }

  setSkill(item: {
    studentId: string;
    year: number;
    skillId: string;
    periodId: string;
    value: string;
  }) {
    return this.http.post(this.url + 'SetSkill', item);
  }

  edit(id: string, skill: Skill) {
    return this.http.put(`${this.url}${id}`, skill);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}
