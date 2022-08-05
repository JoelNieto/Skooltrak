import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamQuestion, MatchItem } from 'src/app/shared/models/exams.model';

@Component({
  selector: 'skooltrak-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.sass']
})
export class MatchFormComponent implements OnInit {
  @Input() question: ExamQuestion;
  @Output() setOption = new EventEmitter<MatchItem[]>();
  matches: string[];
  options: string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.matches = this.question.matchList.map((x) => {
      x.selectedMatch = [];
      return x.optionText;
    });
    this.options = this.shuffle(
      this.question.matchList.map((x) => x.correctMatch)
    );
    this.setOption.emit(this.question.matchList);
  }

  dropped(event: CdkDragDrop<string[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.setOption.emit(this.question.matchList);
  }

  shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let temporaryValue: string;
    let randomIndex: number;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
