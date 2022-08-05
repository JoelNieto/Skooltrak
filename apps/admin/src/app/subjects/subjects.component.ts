import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { subjects as state } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-subjects',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent implements OnInit {
  constructor(private state: state.SubjectsFacade) {}

  ngOnInit(): void {
    this.state.init();
  }
}
