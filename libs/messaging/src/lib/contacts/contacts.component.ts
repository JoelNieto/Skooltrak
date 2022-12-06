import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'skooltrak-app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTabsModule,
    MatTabsModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ 'Contacts' | translate }}</h2>
    <mat-dialog-content>
      <mat-tab-group mat-stretch-tabs="false">
        <mat-tab [label]="'Students' | translate"> </mat-tab>
        <mat-tab [label]="'Teachers' | translate"> </mat-tab>
      </mat-tab-group>
    </mat-dialog-content>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  constructor() {}
}
