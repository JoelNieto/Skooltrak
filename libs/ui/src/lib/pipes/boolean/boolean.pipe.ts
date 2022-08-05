import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean',
  standalone: true,
})
export class BooleanPipe implements PipeTransform {
  transform(value: boolean, args?: any): string {
    if (value) {
      return '<span class="badge rounded-pill badge-success">Sí</span>';
    } else if (value === false) {
      return '<span class="badge rounded-pill badge-false">No</span>';
    } else {
      return '--';
    }
  }
}
