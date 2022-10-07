import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'skooltrak-courses-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-grades.component.html',
  styleUrls: ['./courses-grades.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesGradesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
