import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private storage: StorageMap) {}

  public getFromStorage<T>(id: number) {
    return this.storage.get(id.toString()) as Observable<T>;
  }

  public setOnStorage(id: number, value: any): void {
    this.storage.set(id.toString(), value).subscribe(() => {});
  }

  public clean() {
    this.storage.clear().subscribe(() => {});
  }

  public getColors(): string[] {
    return [
      '#f94144',
      '#ffa5ab',
      '#da627d',
      '#f3722c',
      '#d264b6',
      '#f8961e',
      '#f9c74f',
      '#1982c4',
      '#ffff00',
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
      'book',
      'chemistry',
      'code',
      'computer',
      'conversation',
      'discussion',
      'family',
      'factory',
      'folklore',
      'france',
      'geometry',
      'geography',
      'gym',
      'lab',
      'learning',
      'history',
      'kingdom',
      'language',
      'map',
      'music',
      'panama',
      'philosophy',
      'physics',
      'project',
      'reading',
      'religion',
      'robot',
      'science',
      'sports',
      'table',
      'united-states',
      'uk',
      'venn',
      'world',
      'writing',
    ];
  }
}
