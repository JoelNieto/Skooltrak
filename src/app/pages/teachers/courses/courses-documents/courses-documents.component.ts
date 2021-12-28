import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { DocumentsFormComponent } from 'src/app/shared/components/documents-form/documents-form.component';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FilesService } from 'src/app/shared/services/files.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-courses-documents',
  templateUrl: './courses-documents.component.html',
  styleUrls: ['./courses-documents.component.sass'],
})
export class CoursesDocumentsComponent implements OnInit {
  @Input() course: Course;

  documents$: Observable<UploadFile[]>;
  constructor(
    private coursesService: CoursesService,
    private documentsService: DocumentsService,
    public filesService: FilesService,
    private translate: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.documents$ = this.coursesService.getDocuments(this.course.id);
  }

  showModal() {
    this.modal.open(DocumentsFormComponent).result.then((res: UploadFile) => {
      res.course = { id: this.course.id, name: this.course.name };
      this.documentsService.create(res).subscribe({
        next: () => {
          Swal.fire(
            res.name,
            this.translate.translate('File uploaded successfully'),
            'success'
          );
          this.documents$ = this.coursesService.getDocuments(this.course.id);
        },
        error: (err) => console.error(err),
      });
    });
  }

  getFileIcon(file: UploadFile): string {
    switch (file.file.type) {
      case 'application/pdf':
        return 'PDF';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'XLS';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'DOC';
      case 'image/jpeg':
        return 'JPG';
      case 'image/png':
        return 'PNG';
      default:
        return 'DOC';
    }
  }

  deleteFile(id: string) {
    Swal.fire({
      title: this.translate.translate('Wanna delete item?'),
      text: this.translate.translate('This cant be undone'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3182ce',
      cancelButtonColor: '#718096',
      cancelButtonText: this.translate.translate('Cancel'),
      confirmButtonText: this.translate.translate('Confirm delete'),
    }).then((result) => {
      if (result.value) {
        this.documentsService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              this.translate.translate('Deleted item', {
                value: this.translate.translate('Document'),
              }),
              '',
              'info'
            );
            this.documents$ = this.coursesService.getDocuments(this.course.id);
          },
          error: (err: Error) => {
            Swal.fire(
              this.translate.translate('Something went wrong'),
              this.translate.translate('Try it again later'),
              'error'
            );
          },
        });
      }
    });
  }
}
