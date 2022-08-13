import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmationComponent } from './confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  openDialog(
    type: 'delete' | 'info' | 'warning' = 'delete',
    description: string = 'Item'
  ): Observable<boolean> {
    const dialog = this.dialog.open(ConfirmationComponent, {
      panelClass: ['dialog', 'x-small'],
      data: { type, description },
    });
    return dialog.beforeClosed();
  }
}
