import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private object: { [id: number]: any } = {};
  constructor(private storage: StorageMap) {}

  public getFromStorage<T>(id: number) {
    return this.storage.get<T>(id.toString());
  }

  public setOnStorage() {}
}
