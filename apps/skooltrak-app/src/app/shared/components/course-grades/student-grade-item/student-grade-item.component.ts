import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-student-grade-item',
  templateUrl: './student-grade-item.component.html',
  styleUrls: ['./student-grade-item.component.sass'],
})
export class StudentGradeItemComponent {
  @Input() student: FormGroup;
  @Input() locked: boolean;
  @Output() includeChanged = new EventEmitter();
  constructor(private translate: TranslocoService) {}

  async setMessage(): Promise<void> {
    const { value: comments } = await Swal.fire<Promise<boolean>>({
      title: this.translate.translate('Comments'),
      text: this.student.get('student').value?.name,
      input: 'textarea',
      inputValue: this.student.get('comments').value,
      inputPlaceholder: this.translate.translate('Insert comments here...'),
      inputAttributes: {
        'aria-label': this.translate.translate('Insert comments here...'),
      },
    });

    if (comments) {
      this.student.get('comments').setValue(comments);
    }
  }
}
