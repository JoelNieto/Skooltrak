import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { differenceInYears } from 'date-fns';

@Pipe({
  name: 'ageDate',
  standalone: true,
})
export class AgeDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(date: Date, args?: 'with_date'): string {
    const age = differenceInYears(new Date(), new Date(date));

    return args === 'with_date'
      ? `${this.datePipe.transform(date, 'mediumDate')} (${age})`
      : age.toString();
  }
}
