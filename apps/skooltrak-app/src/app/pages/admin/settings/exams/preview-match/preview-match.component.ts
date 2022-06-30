import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ExamQuestion } from 'src/app/shared/models/exams.model';

@Component({
  selector: 'skooltrak-exam-preview-match',
  templateUrl: './preview-match.component.html',
  styleUrls: ['./preview-match.component.sass'],
})
export class PreviewMatchComponent implements OnInit {
  @Input() question: ExamQuestion;
  matches: string[];
  options: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.matches = this.question.matchList.map((x) => {
      x.selectedMatch = [];
      return x.optionText;
    });
    this.options = this.shuffle(
      this.question.matchList.map((x) => x.correctMatch)
    );
  }

  dropped(event: CdkDragDrop<string[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let temporaryValue: string;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}