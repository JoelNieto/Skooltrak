import { Pipe, PipeTransform } from '@angular/core';
import { isSameDay, format } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'timeMessage',
  pure: false
})
export class TimeMessagePipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();

    if (isSameDay(new Date(value), now)) {
      return format(new Date(value), 'h:mm aaa');
    } else {
      return format(new Date(value), 'd/MM/yy', { locale: es });
    }
  }
}
