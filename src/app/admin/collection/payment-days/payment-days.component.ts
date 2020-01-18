import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentDay } from 'src/app/shared/models/charges.model';
import { PaymentDayService } from 'src/app/shared/services/payment-day.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-days',
  templateUrl: './payment-days.component.html',
  styleUrls: ['./payment-days.component.sass']
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
    private translate: TranslateService,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.days$ = this.paymentServ.getAll().pipe(
      map(res => {
        return res.map(day => {
          return {
            id: day.id,
            title: day.title,
            start: new Date(day.startDate),
            end: new Date(day.dueDate),
            allDay: true,
            meta: {
              day
            }
          };
        });
      })
    );
  }

  dayClicked({
    date,
    events
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
        this.paymentServ.create(this.selectedDay).subscribe(res => {
          Swal.fire(
            res.title,
            this.translate.instant('Created item', {
              value: this.translate.instant('Payment date')
            }),
            'success'
          );
          this.fetchEvents();
        });
      } else {
        this.paymentServ
          .edit(this.selectedDay.id, this.selectedDay)
          .subscribe(() => {
            this.fetchEvents();
            Swal.fire(
              this.selectedDay.title,
              this.translate.instant('Updated item', {
                value: this.translate.instant('Payment date')
              }),
              'success'
            );
          });
      }
    });
  }
}
