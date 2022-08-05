import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassGroup } from '@skooltrak-app/models';

@Injectable()
export class ClassGroupsService {
  constructor(private http: HttpClient) {}

  public getAll = () => this.http.get<ClassGroup[]>('/api/class-groups');

  public get = (id: string) =>
    this.http.get<ClassGroup>(`/api/class-groups/${id}`);

  public post = (group: ClassGroup) =>
    this.http.post<ClassGroup>('/api/class-groups', group);

  public patch = (id: string, group: Partial<ClassGroup>) =>
    this.http.patch<ClassGroup>(`/api/class-groups/${id}`, group);

  public delete = (id: string) => this.http.delete(`/api/class-groups/${id}`);
}
