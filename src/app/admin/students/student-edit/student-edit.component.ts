import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  student: Student;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentsService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentService.get(params.id).subscribe(res => {
        this.student = res;
      });
    });
  }

  updateStudent(student: Student) {
    this.studentService.edit(student.id, student).subscribe(
      res => {
        swal.fire(
          student.name,
          this.translate.instant('Updated item', {
            value: this.translate.instant('Student')
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
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
