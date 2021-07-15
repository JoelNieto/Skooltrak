import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCacheManager, requestDataChanged, withCache } from '@ngneat/cashew';
import { add, addDays, isSaturday, isSunday } from 'date-fns';
import { environment } from 'src/environments/environment';

import { Assignment, AssignmentsDay } from '../models/assignments.model';
import { UploadFile } from '../models/documents.model';
import { Forum } from '../models/forums.model';
import { Video } from '../models/videos.model';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private url: string;
  constructor(
    private http: HttpClient,
    private cacheManager: HttpCacheManager
  ) {
    this.url = environment.urlAPI + 'assignments/';
  }

  public getAll() {
    return this.http.get<Assignment[]>(this.url, {
      context: withCache({ clearCachePredicate: requestDataChanged }),
    });
  }

  public get(id: string) {
    return this.http.get<Assignment>(`${this.url}${id}`);
  }

  public getVideos(id: string) {
    return this.http.get<Video[]>(`${this.url}${id}/Videos`, {
      context: withCache(),
    });
  }

  public getDocuments(id: string) {
    return this.http.get<UploadFile[]>(`${this.url}${id}/Documents`, {
      context: withCache(),
    });
  }

  public create(assignment: Assignment) {
    return this.http.post<Assignment>(this.url, assignment);
  }

  public edit(id: string, assignment: Assignment) {
    return this.http.put(`${this.url}${id}`, assignment);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }

  public getForum(id: string) {
    return this.http.get<Forum>(`${this.url}${id}/Forum`);
  }

  public mapAssignments(
    startDate: Date,
    endDate: Date,
    assignments: Assignment[]
  ) {
    const days: AssignmentsDay[] = [];
    for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
      if (!isSunday(day) && !isSaturday(day)) {
        const current: AssignmentsDay = { date: day, assignments: [] };
        current.assignments.push(
          ...assignments.filter(
            (x) =>
              new Date(
                add(new Date(x.startDate), {
                  minutes: new Date().getTimezoneOffset(),
                })
              ) <= day &&
              new Date(
                add(new Date(x.dueDate), {
                  minutes: new Date().getTimezoneOffset(),
                })
              ) >= day
          )
        );
        days.push(current);
      }
    }
    return days;
  }
}
