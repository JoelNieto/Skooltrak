import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '@skooltrak-app/models';

@Pipe({
  name: 'studentName',
  standalone: true,
})
export class StudentNamePipe implements PipeTransform {
  transform(
    value: Student,
    args: 'full' | 'short' | 'surname' | 'full-surname' = 'surname'
  ): string {
    const { firstName, middleName, surname, secondSurname } = value;
    switch (args) {
      case 'full':
        return `${firstName} ${middleName} ${surname} ${secondSurname}`;
      case 'short':
        return `${firstName} ${surname}`;
      case 'surname':
        return `${surname}, ${firstName}`;
      case 'full-surname':
        return `${surname} ${secondSurname}, ${firstName} ${middleName}`;
      default:
        return `${surname}, ${firstName}`;
    }
  }
}
