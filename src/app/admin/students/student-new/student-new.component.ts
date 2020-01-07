import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  createStudent(student: Student) {
    this.studentService.create(student).subscribe(
      res => {
        swal.fire(
          res.name,
          this.translate.instant('Created item', {
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
