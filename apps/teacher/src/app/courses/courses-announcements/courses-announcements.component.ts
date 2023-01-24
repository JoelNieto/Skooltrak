import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUrlPipe } from '@skooltrak-app/ui';
import { QuillModule } from 'ngx-quill';

import { AnnouncementsService } from './announcements.service';
import { AnnouncementStore } from './announcements.store';

@Component({
  selector: 'skooltrak-courses-announcements',
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    MatButtonModule,
    TranslateModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    ImageUrlPipe,
  ],
  template: `
    <div class="container pt-4">
      <div class="form-container mb-3 p-5 pb-2 pt-0">
        <mat-card [formGroup]="form">
          <mat-card-content>
            <quill-editor
              formControlName="text"
              [modules]="modules"
              theme="bubble"
              placeholder="Deseas compartir algo?"
            />
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-button>
              <mat-icon>attach_file</mat-icon>
            </button>
            <button
              mat-flat-button
              color="primary"
              [disabled]="form.invalid"
              (click)="newAnnouncement()"
            >
              {{ 'Submit' | translate }}
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
      <div class="announcements-container p-3">
        <mat-card
          *ngFor="let announcement of announcements$ | async"
          class="mt-4 mat-elevation-z5"
        >
          <mat-card-header>
            <div
              mat-card-avatar
              class="avatar"
              [style.background-image]="
                'url(' + announcement.author?.profileURL + ')'
              "
            ></div>
            <mat-card-title>{{
              announcement.author?.displayName
            }}</mat-card-title>
            <mat-card-subtitle>{{
              announcement.author?.role
            }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content [innerHtml]="announcement.text"/>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .form-container {
        border-bottom: 1.5px solid var(--gray-300);
      }

      ql-toolbar {
        color: black;
      }

      quill-editor {
        width: 100%;
      }

      .avatar {
        background-size: cover;
      }

      p {
        margin-bottom: 0.25rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(AnnouncementStore), AnnouncementsService],
})
export class CoursesAnnouncementsComponent {
  readonly announcements$ = this.store.announcements$;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };
  form = new FormGroup({
    text: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private readonly store: AnnouncementStore) {}

  newAnnouncement() {
    const { text } = this.form.getRawValue();
    this.store.createAnnouncements({
      text: text,
      _id: '',
      activeSince: new Date(),
      activeUntil: new Date(),
    });
  }
}
