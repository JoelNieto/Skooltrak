import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClassGroup } from '@skooltrak-app/models';

@Injectable()
export class GroupsService {
  private http = inject(HttpClient);

  public getAll = () => this.http.get<ClassGroup[]>('/api/class-groups');

  public get = (id: string) =>
    this.http.get<ClassGroup>(`/api/class-groups/${id}`);
}
