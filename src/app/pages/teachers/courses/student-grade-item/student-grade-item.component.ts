import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-grade-item',
  templateUrl: './student-grade-item.component.html',
  styleUrls: ['./student-grade-item.component.sass']
})
export class StudentGradeItemComponent implements OnInit {
  @Input() student: FormGroup;
  constructor(private translate: TranslocoService) {}

  ngOnInit(): void {}

  async setMessage() {
    if (this.student.get('score').valid && this.student.get('score').value < 3) {
      const { value: comments } = await Swal.fire({
        title: this.translate.translate('Comments'),
        input: 'textarea',
        inputValue: this.student.get('comments').value,
        inputPlaceholder: this.translate.translate('Insert comments here...'),
        inputAttributes: {
          'aria-label': this.translate.translate('Insert comments here...')
        }
      });

      if (comments) {
        this.student.get('comments').setValue(comments);
      }
    }
  }
}
