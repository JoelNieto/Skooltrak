import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student-grade-item',
  templateUrl: './student-grade-item.component.html',
  styleUrls: ['./student-grade-item.component.sass']
})
export class StudentGradeItemComponent implements OnInit {
  @Input() student: FormGroup;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  async setMessage() {
    if (this.student.get('score').valid && this.student.get('score').value < 3) {
      const { value: comments } = await Swal.fire({
        title: this.translate.instant('Comments'),
        input: 'textarea',
        inputValue: this.student.get('comments').value,
        inputPlaceholder: this.translate.instant('Insert comments here...'),
        inputAttributes: {
          'aria-label': this.translate.instant('Insert comments here...')
        }
      });

      if (comments) {
        this.student.get('comments').setValue(comments);
      }
    }
  }
}
