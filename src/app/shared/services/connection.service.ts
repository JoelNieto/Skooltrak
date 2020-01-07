import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  public urlAPI: string;
  constructor() {
    this.urlAPI = environment.urlAPI;
  }
}
