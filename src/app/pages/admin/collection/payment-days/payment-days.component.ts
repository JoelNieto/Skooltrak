import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { add, isSameDay, isSameMonth } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentDay } from 'src/app/shared/models/charges.model';
import { PaymentDayService } from 'src/app/shared/services/payment-day.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-payment-days',
  templateUrl: './payment-days.component.html',
  styleUrls: ['./payment-days.component.sass'],
})
export class PaymentDaysComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  days$: Observable<CalendarEvent<{ day: PaymentDay }>[]>;
  activeDayIsOpen = false;
  selectedDay: PaymentDay;

  constructor(
    private paymentServ: PaymentDayService,
    private translate: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  convertDate(date: Date): NgbDateStruct {
    return date
      ? {
          year: date.getUTCFullYear(),
          month: date.getUTCMonth() + 1,
          day: date.getUTCDate(),
        }
      : null;
  }

  fetchEvents() {
    this.days$ = this.paymentServ.getAll().pipe(
      map((res) =>
        res.map((day) => ({
          id: day.id,
          title: day.title,
          start: add(new Date(day.startDate), {
            minutes: new Date().getTimezoneOffset(),
          }),
          end: add(new Date(day.dueDate), {
            minutes: new Date().getTimezoneOffset(),
          }),
          allDay: true,
          meta: {
            day,
          },
        }))
      )
    );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ day: PaymentDay }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  selectDay(event: CalendarEvent, content: any) {
    this.selectedDay = event.meta.day;
    this.open(content, false);
  }

  open(content: any, isNew: boolean = true): void {
    if (isNew) {
      this.selectedDay = {};
    }
    this.modal.open(content).result.then(() => {
      if (isNew) {
        this.paymentServ.create(this.selectedDay).subscribe({
          next: (res) => {
            Swal.fire(
              res.title,
              this.translate.translate('Created item', {
                value: this.translate.translate('Payment date'),
              }),
              'success'
            );
            this.fetchEvents();
          },
          error: (err) => console.error(err),
        });
      } else {
        this.paymentServ.edit(this.selectedDay.id, this.selectedDay).subscribe({
          next: () => {
            this.fetchEvents();
            Swal.fire(
              this.selectedDay.title,
              this.translate.translate('Updated item', {
                value: this.translate.translate('Payment date'),
              }),
              'success'
            );
          },
          error: (err) => console.error(err),
        });
      }
    });
  }
}
