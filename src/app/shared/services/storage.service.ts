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
      '#f3722c',
      '#f8961e',
      '#f9c74f',
      '#90be6d',
      '#43aa8b',
      '#0081a7',
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
      'biology',
      'chemistry',
      'code',
      'conversation',
      'discussion',
      'family',
      'geometry',
      'geography',
      'gym',
      'learning',
      'history',
      'kingdom',
      'language',
      'music',
      'panama',
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
