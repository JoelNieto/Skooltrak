import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {
  transform(value: any, args: string): any {
    console.log('args', args);
    args.split('.').forEach((element) => {
      value = value[element];
    });
    console.log('value:', value);

    return value;
  }

}
