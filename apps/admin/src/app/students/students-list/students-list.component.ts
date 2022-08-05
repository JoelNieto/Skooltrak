import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { admin_students } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-students-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    TranslateModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsListComponent implements OnInit {
  constructor(private state: admin_students.StudentsFacade) {}

  ngOnInit(): void {}
}
