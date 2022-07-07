import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class MessingFacade {
  constructor(private readonly store: Store) {}
}
