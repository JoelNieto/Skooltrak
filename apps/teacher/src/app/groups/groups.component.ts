import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { teacher_groups } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-groups',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  constructor(private state: teacher_groups.GroupsFacade) {}
  ngOnInit(): void {
    this.state.init();
  }
}
