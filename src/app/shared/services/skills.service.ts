import { Injectable } from '@angular/core';

import { Skill } from '../models/skills.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  url: string;

  constructor(
    private http: CustomHttpService,
    private readonly conn: ConnectionService
  ) {
    this.url = conn.urlAPI + 'skills';
  }

  getAll() {
    return this.http.get<Skill[]>(this.url);
  }

  get(id: string) {
    return this.http.get<Skill>(this.url, id);
  }

  create(skill: Skill) {
    return this.http.post<Skill>(this.url, skill);
  }

  edit(id: string, skill: Skill) {
    return this.http.edit(this.url, id, skill);
  }

  delete(id: string) {
    return this.http.delete(this.url, id);
  }
}
