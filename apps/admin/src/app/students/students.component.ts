import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { admin_students } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-students',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent implements OnInit {
  constructor(private state: admin_students.StudentsFacade) {}

  ngOnInit(): void {
    this.state.init();
  }
}
