import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Assignment, QueryApi, QueryItem } from '@skooltrak-app/models';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarUtils,
  CalendarView,
  DateAdapter,
  DAYS_OF_WEEK,
} from 'angular-calendar';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { filter } from 'rxjs';
import { ConfirmationService } from '../confirmation/confirmation.service';
import { CalendarService } from './calendar.service';
import { CalendarStore } from './calendar.store';

@Component({
  selector: 'skooltrak-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    TranslateModule,
    MatProgressBarModule,
    FormsModule,
    RouterModule,
  ],
  template: `<div class="container main">
    <ng-template #loading>
      <mat-progress-bar mode="query"></mat-progress-bar>
    </ng-template>
    <ng-container *ngIf="events$ | async; else loading; let events">
      <div class="row mb-3">
        <div class="col-md-4 ps-4">
          <button
            mat-flat-button
            color="primary"
            mwlCalendarPreviousView
            [excludeDays]="excludeDays"
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="fetchEvents()"
          >
            {{ 'Previous' | translate }}
          </button>
          <button
            mat-flat-button
            mwlCalendarToday
            [(viewDate)]="viewDate"
            class="mx-1"
            (viewDateChange)="fetchEvents()"
          >
            {{ 'Today' | translate }}
          </button>
          <button
            mat-flat-button
            color="primary"
            mwlCalendarNextView
            [excludeDays]="excludeDays"
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="fetchEvents()"
          >
            {{ 'Next' | translate }}
          </button>
        </div>
        <div class="col-md-4 title">
          <h4>
            {{
              viewDate
                | calendarDate
                  : view + 'ViewTitle'
                  : 'es-PA'
                  : weekStartOn
                  : excludeDays
            }}
          </h4>
        </div>
        <div class="col-md-4 d-flex justify-content-end pe-4">
          <mat-button-toggle-group
            [(ngModel)]="view"
            (ngModelChange)="fetchEvents()"
            name="fontStyle"
            aria-label="Font Style"
          >
            <mat-button-toggle [value]="CalendarView.Month">{{
              'Month' | translate
            }}</mat-button-toggle>
            <mat-button-toggle [value]="CalendarView.Week">{{
              'Week' | translate
            }}</mat-button-toggle>
            <mat-button-toggle [value]="CalendarView.Day">{{
              'Day' | translate
            }}</mat-button-toggle>
          </mat-button-toggle-group>
        </div>
      </div>
      <div class="container">
        <div [ngSwitch]="view">
          <mwl-calendar-month-view
            *ngSwitchCase="CalendarView.Month"
            [viewDate]="viewDate"
            [events]="events"
            [locale]="locale"
            [weekStartsOn]="weekStartOn"
            [weekendDays]="weekendDays"
            [excludeDays]="excludeDays"
            [activeDayIsOpen]="activeDayIsOpen"
            (dayClicked)="dayClicked($event.day)"
            (eventClicked)="eventClicked($event.event)"
          />
          <mwl-calendar-week-view
            *ngSwitchCase="CalendarView.Week"
            [viewDate]="viewDate"
            [events]="events"
            [locale]="locale"
            [weekStartsOn]="weekStartOn"
            [weekendDays]="weekendDays"
            [excludeDays]="excludeDays"
            [dayStartHour]="7"
            [dayEndHour]="17"
            (dayClicked)="dayClicked($event.day)"
            (eventClicked)="eventClicked($event.event)"
          />
          <mwl-calendar-day-view
            *ngSwitchCase="CalendarView.Day"
            [viewDate]="viewDate"
            [events]="events"
            [locale]="locale"
            [dayStartHour]="7"
            [dayEndHour]="17"
            (dayClicked)="dayClicked($event.day)"
            (eventClicked)="eventClicked($event.event)"
          />
        </div>
      </div>
      <button
        mat-flat-button
        color="accent"
        class="float"
        *ngIf="newAction.observers.length"
        (click)="newAction.emit()"
      >
        {{ 'New assignment' | translate }}
      </button>
    </ng-container>
  </div> `,
  styles: [
    `
      .title {
        text-align: center;
      }

      .main {
        margin-top: 1rem;
      }

      .float {
        position: absolute;
        bottom: 40px;
        right: 40px;
      }
    `,
  ],
  providers: [
    CalendarUtils,
    { provide: DateAdapter, useFactory: adapterFactory },
    CalendarA11y,
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
    provideComponentStore(CalendarStore),
    CalendarService,
    ConfirmationService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() title = 'Calendar';
  @Input() context!: QueryItem;
  @Input() canDelete = false;
  @Input() contextId: string | undefined | null;
  @Input() contextQuery?: Partial<QueryApi>;
  @Output() newAction = new EventEmitter();

  @Output() selectAction = new EventEmitter<Assignment>();

  view: CalendarView = CalendarView.Month;

  events$ = this.store.events$;
  excludeDays: number[] = [0, 6];

  CalendarView = CalendarView;
  locale = 'es-PA';
  weekStartOn = DAYS_OF_WEEK.MONDAY;
  weekendDays = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  viewDate: Date = new Date();
  activeDayIsOpen = false;

  constructor(
    private readonly translate: TranslateService,
    private router: Router,
    private store: CalendarStore,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    if (this.selectAction.observers.length) {
      this.store.actions = [
        {
          label: this.translate.instant('Edit'),
          a11yLabel: 'Edit',
          onClick: ({ event }: { event: CalendarEvent<Assignment> }): void => {
            this.selectAction.emit(event.meta);
          },
        },
      ];
    }

    if (this.canDelete) {
      this.store.actions = [
        ...this.store.actions,
        {
          label: this.translate.instant('Delete'),
          a11yLabel: 'Delete',
          onClick: ({ event }: { event: CalendarEvent<Assignment> }): void => {
            this.confirmationService
              .openDialog('delete', event.meta?.title)
              .pipe(filter((value) => !!value))
              .subscribe({
                next: () => this.store.removeAssignments(event.id as string),
              });
          },
        },
      ];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contextId']) {
      const params: Partial<QueryApi> = {
        [this.context]: this.contextId,
      };
      this.store.setQuery(params);
    }

    if (changes['contextQuery'] && !!this.contextQuery) {
      this.store.setQuery(this.contextQuery);
    }
  }

  public fetchEvents() {
    this.activeDayIsOpen = false;
    const getStart = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const startDate = getStart(this.viewDate);
    const endDate = getEnd(this.viewDate);
    this.store.changeDateRange({ startDate, endDate });
  }

  public dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        !events.length
      ) {
        this.activeDayIsOpen = false;
      } else this.activeDayIsOpen = true;
    }
    this.viewDate = date;
  }

  public eventClicked(event: CalendarEvent<Assignment>): void {
    this.router.navigate(['assignments', event.id]);
  }
}
