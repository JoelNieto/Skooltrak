import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'skooltrak-courses-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-schedule.component.html',
  styleUrls: ['./courses-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
