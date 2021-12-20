import { Component, Input } from '@angular/core';
import { Exam } from 'src/app/shared/models/exams.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'skooltrak-exam-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass'],
})
export class PreviewComponent {
  @Input() exam: Exam;

  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 50,
    minHeight: 50,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
        ],
      ],
      ['fontsize', ['fontsize', 'color']],
      ['insert', ['picture']],
    ],
  };
}
