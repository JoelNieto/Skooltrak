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
  styleUrls: ['./student-new.component.sass'],
})
export class StudentNewComponent implements OnInit {
  constructor(
    private studentService: StudentsService,
    private transloco: TranslocoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const { value: documentId } = await swal.fire({
      title: this.transloco.translate('Insert document ID'),
      input: 'text',
      inputLabel: '0-000-0000',
      showCancelButton: false,
      confirmButtonText: 'Validar',
      inputValidator: (value) => {
        if (!value) {
          return 'Favor ingresar nro. de cédula o pasaporte';
        }
      },
    });
    if (documentId) {
      this.studentService.getByDocument(documentId).subscribe(
        (res) => {
          swal.fire('Estudiante existente!', res.name, 'success');
          this.router.navigate(['./', res.id], {
            relativeTo: this.route.parent,
            state: { activate: true },
          });
        },
        (err) => console.log(err)
      );
    }
  }

  createStudent(student: Student) {
    this.studentService.create(student).subscribe(
      (res) => {
        swal.fire(
          res.name,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('Student'),
          }),
          'success'
        );
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      },
      (err: HttpErrorResponse) => {
        swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate(err.error),
          'error'
        );
      }
    );
  }
}
