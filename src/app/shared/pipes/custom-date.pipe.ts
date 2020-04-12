import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'customDate',
  pure: false,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date, time?: string): string {
    if (time === 'time') {
      return format(new Date(value), 'iii d MMMM, yyyy h:mm aaa', {
        locale: es,
      });
    } else {
      return format(new Date(value), "iii d MMMM, yyyy", {
        locale: es,
      });
    }
  }
}
