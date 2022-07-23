import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { StudentsFormComponent } from '../students-form/students-form.component';

@Component({
  selector: 'skooltrak-students-new',
  standalone: true,
  imports: [CommonModule, StudentsFormComponent],
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsNewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
