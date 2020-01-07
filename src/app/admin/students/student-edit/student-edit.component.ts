import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    private translate: TranslateService,
  ) {}

  ngOnInit() {}

  updateStudent(student: Student) {
    this.studentService.edit(student.id, student).subscribe(
      () => {
        swal.fire(
          this.student.name,
          this.translate.instant('Updated item', {
            value: this.translate.instant('Student')
          }),
          'success'
        );
      },
      (err: Error) => {
        swal.fire(
          this.translate.instant('Something went wrong'),
          err.message,
          'error'
        );
      }
    );
  }
}
