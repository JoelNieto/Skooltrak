import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'skooltrak-app-compose',
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    MatDialogModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ContactsComponent,
  ],
  template: `
    <h2 mat-dialog-title>{{ 'New message' | translate }}</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>{{ 'Topic' | translate }}</mat-label>
        <input matInput />
      </mat-form-field>
      <div class="row">
        <div class="col-11">
          <mat-form-field (click)="openContacts()">
            <mat-label>{{ 'Contacts' | translate }}</mat-label>
            <input matInput disabled="true" />
          </mat-form-field>
        </div>
        <div class="col-1">
          <button mat-fab color="accent" (click)="openContacts()">
            <mat-icon>group_add</mat-icon>
          </button>
        </div>
      </div>
      <quill-editor
        formControlName="content"
        [styles]="{ height: '300px' }"
        [modules]="modules"
      ></quill-editor>
    </mat-dialog-content>
  `,
  styles: [
    `
      quill-editor {
        display: block;
      }

      ::ng-deep .ql-container,
      ::ng-deep .ql-toolbar {
        background-color: rgba(0, 0, 0, 0.04);
        border-color: transparent !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposeComponent {
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'],
    ],
  };
  constructor(private contactDialog: MatDialog) {}

  openContacts() {
    this.contactDialog.open(ContactsComponent, {
      panelClass: ['dialog', 'medium'],
    });
  }
}
