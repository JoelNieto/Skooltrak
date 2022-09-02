import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
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
  templateUrl: './courses-announcements.component.html',
  styleUrls: ['./courses-announcements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AnnouncementStore, AnnouncementsService],
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
