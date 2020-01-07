import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    const items = value.map(item => {
      return `<span class="badge badge-pill badge-primary">${
        item[args]
      }</span>`;
    });
    return items.join(' ');
  }
}
