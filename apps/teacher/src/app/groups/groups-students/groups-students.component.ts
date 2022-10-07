import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { TranslateModule } from '@ngx-translate/core';
import { Student } from '@skooltrak-app/models';
import { GroupsStudentsService } from './groups-students.service';
import { GroupsStudentsStore } from './groups-students.store';

@Component({
  selector: 'skooltrak-groups-students',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './groups-students.component.html',
  styleUrls: ['./groups-students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    GroupsStudentsService,
    provideComponentStore(GroupsStudentsStore),
  ],
})
export class GroupsStudentsComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>();
  constructor(private store: GroupsStudentsStore) {}

  ngOnInit(): void {
    this.store.students$.subscribe({
      next: (students) => {
        this.dataSource.data = students;
      },
    });
  }
}
