import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.sass'],
})
export class QuestionFormComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() index: number;
  @Output() addOption = new EventEmitter<FormGroup>();
  @Output() removeOption = new EventEmitter<number>();

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
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['picture', 'link']],
    ],
  };
  constructor() {}

  ngOnInit(): void {}

  clickAdd() {
    this.addOption.emit(this.group);
  }

  clickRemove(id: number) {
    this.removeOption.emit(id);
  }
}
