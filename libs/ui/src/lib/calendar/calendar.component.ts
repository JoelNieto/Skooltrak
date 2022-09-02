import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarUtils,
  CalendarView,
  DateAdapter,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { addDays, addHours, endOfMonth, startOfDay, subDays } from 'date-fns';

@Component({
  selector: 'skooltrak-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    CalendarUtils,
    { provide: DateAdapter, useFactory: adapterFactory },
    CalendarA11y,
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  @Input() title = 'Calendar';

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  locale = 'es-PA';
  weekStartOn = DAYS_OF_WEEK.MONDAY;
  weekendDays = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  viewDate: Date = new Date();
  activeDayIsOpen = true;

  actions: CalendarEventAction[] = [
    {
      label: this.translate.instant('Details'),
      a11yLabel: 'Details',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.warn(event);
      },
    },
  ];

  constructor(private readonly translate: TranslateService) {}

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      allDay: true,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      actions: this.actions,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      actions: this.actions,
      draggable: true,
    },
  ];
}
