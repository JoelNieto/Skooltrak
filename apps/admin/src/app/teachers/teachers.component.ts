import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { teachers } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-teachers',
  standalone: true,
  imports: [RouterModule],
  template: ' <router-outlet> </router-outlet> ',
  styleUrls: ['./teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit {
  constructor(private state: teachers.TeachersFacade) {}

  ngOnInit(): void {
    this.state.init();
  }
}
