import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { Assignment, QueryApi } from '@skooltrak-app/models';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { endOfMonth, startOfMonth } from 'date-fns';
import {
  catchError,
  concatMap,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { CalendarService } from './calendar.service';
interface State {
  startDate: Date;
  endDate: Date;
  query?: Partial<QueryApi>;
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

  public actions: CalendarEventAction[] = [];

  constructor(
    private service: CalendarService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    @Inject(LOCALE_ID) private locale: string
  ) {
    super({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      assignments: [],
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
      withLatestFrom(this.query$),
      filter(([, query]) => !!query),
      map(([assignments, query]) =>
        assignments.map((item) => ({
          id: item._id,
          title: this.formatAssignment({ item, query }),
          start: new Date(item.start),
          end: new Date(item.end),
          meta: item,
          actions: this.actions,
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

  private readonly deleteAssignment = this.updater(
    (state, id: string): State => ({
      ...state,
      assignments: state.assignments.filter((x) => x._id !== id),
    })
  );

  // EFFECTS

  private readonly fetchAssignments = this.effect(
    (
      calendarData$: Observable<{
        start: Date;
        end: Date;
        query?: Partial<QueryApi>;
      }>
    ) => {
      return calendarData$.pipe(
        filter(({ query }) => !!query),
        concatMap(({ start, end, query }) => {
          return this.service.getAssignments(start, end, query).pipe(
            tap((results) => this.updateAssignmentResults(results)),
            catchError(() =>
              of(
                this.snackBar.open(
                  this.translate.instant('Something went wrong'),
                  undefined,
                  { panelClass: ['alert', 'failure'] }
                )
              )
            )
          );
        })
      );
    }
  );

  public readonly removeAssignments = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((id) => {
        return this.service.deleteAssignment(id).pipe(
          tap(() => this.deleteAssignment(id)),
          tap(() =>
            this.snackBar.open(
              this.translate.instant('Item deleted successfully'),
              undefined,
              { panelClass: ['alert'] }
            )
          ),
          catchError(() =>
            of(
              this.snackBar.open(
                this.translate.instant('Something went wrong'),
                undefined,
                { panelClass: ['alert', 'failure'] }
              )
            )
          )
        );
      })
    );
  });

  private formatAssignment({
    item,
    query,
  }: {
    item: Assignment;
    query?: Partial<QueryApi>;
  }): string {
    query = query ?? {};
    const { course, group } = query;
    if (!!course) {
      return `<b>${formatDate(item.start, 'h:mm a', this.locale)}</b> <em>[${
        item.group.name
      }]</em> ${item.type.name}: ${item.title}`;
    }

    if (!!group) {
      return `<b>${formatDate(item.start, 'h:mm a', this.locale)}</b> <em>[${
        item.course.subject.shortName
      }]</em> ${item.type.name}: ${item.title}`;
    }

    return `<b>${formatDate(item.start, 'h:mm a', this.locale)}</b> <em>[${
      item.course.subject.shortName
    }/${item.group.name}]</em> ${item.type.name}: ${item.title}`;
  }
}
