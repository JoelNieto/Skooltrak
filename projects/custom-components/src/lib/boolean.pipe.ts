import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: boolean, args?: any): string {
    if (value) {
      return '<span class="badge badge-pill badge-success">Sí</span>';
    } else if (value === false) {
      return '<span class="badge badge-pill badge-false">No</span>';
    } else {
      return '--';
    }
  }

}
