import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.sass']
})
export class StudentEditComponent implements OnInit {
  @Input() student: Student;
  constructor(
    private studentService: StudentsService,
    private translate: TranslocoService,
  ) {}

  ngOnInit() {}

  updateStudent(student: Student) {
    this.studentService.edit(student.id, student).subscribe(
      () => {
        swal.fire(
          this.student.name,
          this.translate.translate('Updated item', {
            value: this.translate.translate('Student')
          }),
          'success'
        );
      },
      (err: Error) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          err.message,
          'error'
        );
      }
    );
  }
}
