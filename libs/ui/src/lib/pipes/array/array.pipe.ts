import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array',
  standalone: true,
})
export class ArrayPipe implements PipeTransform {
  transform(value: any[], args: string): any {
    const items = value?.map(
      (item) =>
        `<span class="badge rounded-pill badge-primary mt-1">${item[args]}</span>`
    );
    return items?.join(' ');
  }
}
