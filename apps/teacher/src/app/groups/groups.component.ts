import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { teacher_groups } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-groups',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '<router-outlet />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  private state = inject(teacher_groups.GroupsFacade);

  ngOnInit(): void {
    this.state.init();
  }
}
