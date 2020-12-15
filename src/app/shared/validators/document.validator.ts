import { StudentsService } from '../services/students.service';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export class DocumentIdValidator {
  static createValidator(service: StudentsService, studentId: string = '') {
    return (control: AbstractControl) =>
      service
        .validateDocument(control.value, studentId)
        .pipe(map((res) => (res ? null : { exists: true })));
  }
}
