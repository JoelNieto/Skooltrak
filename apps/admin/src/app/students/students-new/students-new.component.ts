import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Student } from '@skooltrak-app/models';

import { StudentsFormComponent } from '../students-form/students-form.component';
import { StudentsService } from '../students.service';
import { StudentsStore } from '../students.store';

@Component({
  selector: 'skooltrak-students-new',
  standalone: true,
  imports: [CommonModule, StudentsFormComponent],
  template: `<skooltrak-students-form
    (saveStudent)="createStudent($event)"
  /> `,
  providers: [StudentsService, StudentsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsNewComponent {
  constructor(private readonly state: StudentsStore) {}

  createStudent(student: Partial<Student>) {
    this.state.createStudent(student);
  }
}
