import { Pipe, PipeTransform } from '@angular/core';
import { Assignment } from '@skooltrak-app/models';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'assignmentDate',
  standalone: true,
})
export class AssignmentDatePipe implements PipeTransform {
  transform(assignment: Assignment): string {
    let { start, end } = assignment;
    start = new Date(start);
    end = new Date(end);

    const startTime = format(start, 'E d MMMM, yyyy h:mm aa', { locale: es });
    const endTime = isSameDay(start, end)
      ? format(end, 'h:mm aa', { locale: es })
      : format(end, 'E d MMMM, yyyy h:mm aa', { locale: es });
    return `${startTime} - ${endTime}`;
  }
}
