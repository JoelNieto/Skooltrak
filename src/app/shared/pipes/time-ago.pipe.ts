import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();
    return (
      'Hace ' + formatDistance(new Date(value), now.getTime(), { locale: es })
    );
  }
}
