import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'skooltrak-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
