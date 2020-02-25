import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Student } from 'src/app/shared/models/students.model';
import { StudentsService } from 'src/app/shared/services/students.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.sass']
})
export class StudentNewComponent implements OnInit {
  constructor(
    private studentService: StudentsService,
    private translate: TranslocoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  createStudent(student: Student) {
    this.studentService.create(student).subscribe(
      res => {
        swal.fire(
          res.name,
          this.translate.translate('Created item', {
            value: this.translate.translate('Student')
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err: HttpErrorResponse) => {
        swal.fire(
          this.translate.translate('Something went wrong'),
          this.translate.translate(err.error),
          'error'
        );
      }
    );
  }
}
