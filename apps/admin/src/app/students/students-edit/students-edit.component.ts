import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'skooltrak-students-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsEditComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
