import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { class_groups } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-class-groups',
  standalone: true,
  imports: [RouterModule],
  template: ` <router-outlet> </router-outlet> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsComponent implements OnInit {
  constructor(private state: class_groups.ClassGroupsFacade) {}

  ngOnInit(): void {
    this.state.init();
  }
}
