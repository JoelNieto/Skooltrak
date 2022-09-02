import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassGroup } from '@skooltrak-app/models';

@Injectable()
export class GroupsService {
  constructor(private http: HttpClient) {}

  public getAll = () => this.http.get<ClassGroup[]>('/api/class-groups');

  public get = (id: string) =>
    this.http.get<ClassGroup>(`/api/class-groups/${id}`);
}
