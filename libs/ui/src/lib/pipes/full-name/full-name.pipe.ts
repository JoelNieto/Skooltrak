import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: true,
  pure: true,
})
export class FullNamePipe implements PipeTransform {
  transform(
    value: {
      firstName?: string;
      middleName?: string;
      surname?: string;
      secondSurname?: string;
    },
    args: 'full' | 'short' | 'surname' = 'surname'
  ): string {
    switch (args) {
      case 'full':
        return `${value.firstName} ${value.middleName} ${value.surname} ${value.secondSurname}`;
      case 'short':
        return `${value.firstName} ${value.surname}`;
      case 'surname':
        return `${value.surname}, ${value.firstName}`;
      default:
        return `${value.surname}, ${value.firstName}`;
    }
  }
}
