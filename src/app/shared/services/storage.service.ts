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
    this.storage.set(id.toString(), value).subscribe(() => { });
  }
}
