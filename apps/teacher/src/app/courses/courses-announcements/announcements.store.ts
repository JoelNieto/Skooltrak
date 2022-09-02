/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Announcement } from '@skooltrak-app/models';
import { teacher_courses } from '@skooltrak-app/state';
import { filter, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';

import { AnnouncementsService } from './announcements.service';

export interface AnnouncementsState {
  announcements: Announcement[];
}

@Injectable()
export class AnnouncementStore extends ComponentStore<AnnouncementsState> {
  constructor(
    private store: teacher_courses.CoursesFacade,
    private service: AnnouncementsService
  ) {
    super({ announcements: [] });
    this.fetchAnnouncements();
  }

  // SELECTORS

  readonly announcements$ = this.select((state) => state.announcements);

  // EFFECTS

  readonly fetchAnnouncements = this.effect(() => {
    return this.store.selectedCourse$.pipe(
      filter((course) => !!course),
      switchMap((course) =>
        this.service
          .getAll(course?._id!)
          .pipe(map((values) => this.setAnnouncements(values)))
      )
    );
  });

  readonly createAnnouncements = this.effect(
    (announcement$: Observable<Announcement>) => {
      return announcement$.pipe(
        withLatestFrom(this.store.selectedCourse$),
        switchMap(([announcement, course]) =>
          this.service
            .post({ ...announcement, courses: [course!] })
            .pipe(tap(this.addAnnouncement(announcement)))
        )
      );
    }
  );

  // UPDATERS

  private readonly setAnnouncements = this.updater(
    (state, items: Announcement[]): AnnouncementsState => ({
      announcements: items,
    })
  );

  private readonly addAnnouncement = this.updater(
    (state, item: Announcement): AnnouncementsState => ({
      announcements: [item, ...state.announcements],
    })
  );
}
