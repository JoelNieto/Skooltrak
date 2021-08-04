import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StudentsService } from '../services/students.service';

export class DocumentIdValidator {
  static createValidator(
    service: StudentsService,
    studentId: string = ''
  ): (control: AbstractControl) => Observable<{
    exists: boolean;
  }> {
    return (control: AbstractControl): any =>
      service
        .validateDocument(control.value, studentId)
        .pipe(map((res) => (res ? null : { exists: true })));
  }
}
