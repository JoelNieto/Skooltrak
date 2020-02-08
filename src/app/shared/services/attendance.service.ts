import { Injectable } from '@angular/core';

import { AttendanceSheet } from '../models/attendance.model';
import { ConnectionService } from './connection.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private url: string;
  constructor(
    private conn: ConnectionService,
    private http: CustomHttpService
  ) {
    this.url = conn.urlAPI + 'attendance';
  }

  public getAll() {
    return this.http.get<AttendanceSheet[]>(this.url);
  }

  public get(id: string) {
    return this.http.get<AttendanceSheet>(this.url, id);
  }

  public create(attendace: AttendanceSheet) {
    return this.http.post<AttendanceSheet>(this.url, attendace);
  }

  public edit(id: string, attendace: AttendanceSheet) {
    return this.http.edit(this.url, id, attendace);
  }

  public delete(id: string) {
    return this.http.delete(this.url, id);
  }
}
