import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'skooltrak-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.sass'],
})
export class QuestionFormComponent {
  @Input() group: UntypedFormGroup;
  @Input() index: number;
  @Output() addOption = new EventEmitter<UntypedFormGroup>();
  @Output() removeOption = new EventEmitter<number>();

  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 50,
    minHeight: 50,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['font', ['bold', 'italic', 'underline']],
      ['insert', ['link']],
    ],
  };
  constructor() {}

  clickAdd() {
    this.addOption.emit(this.group);
  }

  clickRemove(id: number) {
    this.removeOption.emit(id);
  }
}
