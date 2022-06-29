import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column',
  standalone: true,
})
export class ColumnPipe implements PipeTransform {
  transform(value: any, args: string): any {
    args.split('.').forEach((element) => {
      value = value[element];
    });

    return value;
  }
}
