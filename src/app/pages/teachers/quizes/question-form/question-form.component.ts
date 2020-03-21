import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.sass']
})
export class QuestionFormComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() index: number;
  @Output() addOption = new EventEmitter<FormGroup>();
  @Output() removeOption = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  clickAdd() {
    this.addOption.emit(this.group);
  }

  clickRemove(id: number) {
    this.removeOption.emit(id);
  }

}
