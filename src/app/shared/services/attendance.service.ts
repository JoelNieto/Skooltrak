import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { environment } from 'src/environments/environment';

import { AttendanceSheet } from '../models/attendance.model';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.urlAPI + 'attendance/';
  }

  public getAll() {
    return this.http.get<AttendanceSheet[]>(this.url, { context: withCache() });
  }

  public get(id: string) {
    return this.http.get<AttendanceSheet>(`${this.url}${id}`);
  }

  public create(attendance: AttendanceSheet) {
    return this.http.post<AttendanceSheet>(this.url, attendance);
  }

  public edit(id: string, attendance: AttendanceSheet) {
    return this.http.put(`${this.url}${id}`, attendance);
  }

  public delete(id: string) {
    return this.http.delete(`${this.url}${id}`);
  }
}
