import { Injectable } from '@angular/core';
import { addDays, addHours } from 'date-fns';

import { Assignment, AssignmentsDay } from '../models/assignments.model';
import { UploadFile } from '../models/documents.model';
import { Forum } from '../models/forums.model';
import { Video } from '../models/videos.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'assignments';
  }

  public getAll() {
    return this.http.get<Assignment[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<Assignment>(this.url, id);
  }

  public getVideos(id: string) {
    return this.http.get<Video[]>(`${this.url}/${id}/Videos`);
  }

  public getDocuments(id: string) {
    return this.http.get<UploadFile[]>(`${this.url}/${id}/Documents`);
  }

  public create(assignment: Assignment) {
    return this.http.post<Assignment>(this.url, assignment);
  }

  public edit(id: string, assignment: Assignment) {
    return this.http.edit(this.url, id, assignment);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }

  public getForum(id: string) {
    return this.http.get<Forum>(`${this.url}/${id}/Forum`);
  }

  public mapAssignments(
    startDate: Date,
    endDate: Date,
    assignments: Assignment[]
  ) {
    const days: AssignmentsDay[] = [];
    for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
      const current: AssignmentsDay = { date: day, assignments: [] };
      current.assignments.push(
        ...assignments.filter(
          (x) =>
            new Date(addHours(new Date(x.startDate), 5)) <= day &&
            new Date(addHours(new Date(x.dueDate), 5)) >= day
        )
      );
      days.push(current);
    }
    return days;
  }
}
