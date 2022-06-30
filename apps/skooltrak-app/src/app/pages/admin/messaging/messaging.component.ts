import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'skooltrak-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.sass'],
})
export class MessagingComponent {
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 2,
    height: 300,
    minHeight: 300,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['misc', ['undo', 'redo']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
  };
  constructor() {}
}