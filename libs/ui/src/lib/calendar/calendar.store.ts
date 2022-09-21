import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Assignment, QueryApi } from '@skooltrak-app/models';
import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { endOfMonth, startOfMonth } from 'date-fns';
import { concatMap, filter, map, Observable, tap } from 'rxjs';
import { CalendarService } from './calendar.service';
interface State {
  startDate: Date;
  endDate: Date;
  query: Partial<QueryApi>;
  assignments: Assignment[];
}

@Injectable()
export class CalendarStore extends ComponentStore<State> {
  colors: Record<'blue' | 'yellow' | 'red', EventColor> = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  constructor(
    private service: CalendarService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    super({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      assignments: [],
      query: {},
    });
    this.fetchAssignments(this.fetchData$);
  }

  // SELECTORS

  public readonly startDate$ = this.select((state) => state.startDate);
  public readonly endDate$ = this.select((state) => state.endDate);
  public readonly query$ = this.select((state) => state.query);
  public readonly assignments$ = this.select((state) => state.assignments);

  public readonly events$: Observable<CalendarEvent<Assignment>[]> =
    this.select((state) => state.assignments).pipe(
      map((assignments) =>
        assignments.map((item) => ({
          id: item._id,
          title: `<b>${formatDate(
            item.start,
            'h:mm a',
            this.locale
          )}</b> <em>[${item.course.subject.shortName} / ${
            item.group.name
          }]</em> ${item.type.name}: ${item.title}`,
          start: new Date(item.start),
          end: new Date(item.end),
          meta: item,
          color: this.colors[item.type.color],
        }))
      )
    );

  private readonly fetchData$ = this.select(
    this.startDate$,
    this.endDate$,
    this.query$,
    (start, end, query) => ({ start, end, query }),
    { debounce: true }
  );

  // UPDATERS

  public readonly setQuery = this.updater(
    (state, query: Partial<QueryApi>): State => ({ ...state, query })
  );

  public readonly changeDateRange = this.updater(
    (state, value: { startDate: Date; endDate: Date }): State => ({
      ...state,
      startDate: value.startDate,
      endDate: value.endDate,
    })
  );

  public readonly updateAssignmentResults = this.updater(
    (state, assignments: Assignment[]): State => ({ ...state, assignments })
  );

  // EFFECTS

  private readonly fetchAssignments = this.effect(
    (
      calendarData$: Observable<{
        start: Date;
        end: Date;
        query: Partial<QueryApi>;
      }>
    ) => {
      return calendarData$.pipe(
        filter(({ query }) => !!Object.keys(query).length),
        concatMap(({ start, end, query }) => {
          return this.service
            .getAssignments(start, end, query)
            .pipe(tap((results) => this.updateAssignmentResults(results)));
        })
      );
    }
  );

  private getRandomColor = () => Math.floor(Math.random() * 3);
}
