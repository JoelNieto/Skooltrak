import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { plans as state } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-study-plans',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./study-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlansComponent implements OnInit {
  constructor(private state: state.StudyPlansFacade) {}

  ngOnInit(): void {
    this.state.init();
  }
}