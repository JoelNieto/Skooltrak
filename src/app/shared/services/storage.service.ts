import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private object: { [id: number]: any } = {};
  constructor(private storage: StorageMap) {}

  public getFromStorage<T>(id: number) {
    return this.storage.get<T>(id.toString()) as Observable<T>;
  }

  public setOnStorage(id: number, value: any): void {
    this.storage.set(id.toString(), value).subscribe(() => {});
  }

  public getColors(): string[] {
    return [
      '#f94144',
      '#ffa5ab',
      '#da627d',
      '#f3722c',
      '#d264b6',
      '#d264b6',
      '#f8961e',
      '#f9c74f',
      '#1982c4',
      '#9d4edd',
      '#90be6d',
      '#43aa8b',
      '#ffa69e',
      '#00a8e8',
      '#007ea7',
      '#62b6cb',
      '#32a632',
      '#a0c4ff',
      '#bdb2ff',
      '#00afb9',
      '#9bf6ff',
      '#577590',
    ];
  }

  public getIcons(): string[] {
    return [
      'accounting',
      'algebra',
      'art',
      'atom',
      'biology',
      'chemistry',
      'code',
      'computer',
      'conversation',
      'discussion',
      'family',
      'factory',
      'geometry',
      'geography',
      'gym',
      'lab',
      'learning',
      'history',
      'kingdom',
      'language',
      'music',
      'panama',
      'physics',
      'project',
      'reading',
      'religion',
      'robot',
      'science',
      'sports',
      'world',
      'writing',
    ];
  }
}
