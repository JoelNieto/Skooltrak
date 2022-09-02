import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Student } from '@skooltrak-app/models';
import { admin_students } from '@skooltrak-app/state';

import { StudentsFormComponent } from '../students-form/students-form.component';

@Component({
  selector: 'skooltrak-students-new',
  standalone: true,
  imports: [CommonModule, StudentsFormComponent],
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsNewComponent {
  constructor(private readonly state: admin_students.StudentsFacade) {}

  createStudent(student: Partial<Student>) {
    this.state.create(student);
  }
}
