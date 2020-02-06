import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CourseDocument } from 'src/app/shared/models/documents.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FilesService } from 'src/app/shared/services/files.service';
import Swal from 'sweetalert2';

import { DocumentFormComponent } from '../document-form/document-form.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass']
})
export class DocumentsComponent implements OnInit {
  @Input() course: Course;

  $documents: Observable<CourseDocument[]>;
  constructor(
    private coursesService: CoursesService,
    private documentsService: DocumentsService,
    public filesService: FilesService,
    private translate: TranslateService,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    this.$documents = this.coursesService.getDocuments(this.course.id);
  }

  showModal() {
    this.modal
      .open(DocumentFormComponent)
      .result.then((res: CourseDocument) => {
        res.course = { id: this.course.id, name: this.course.name };
        this.documentsService.create(res).subscribe(() => {
          Swal.fire(
            res.name,
            this.translate.instant('File uploaded successfully'),
            'success'
          );
          this.$documents = this.coursesService.getDocuments(this.course.id);
        });
      });
  }

  getFileIcon(file: CourseDocument): string {
    switch (file.file.type) {
      case 'application/pdf':
        return 'far fa-3x fa-file-pdf danger-text';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'far fa-3x fa-file-excel success-text';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'far fa-3x fa-file-word primary-text';
      case 'image/jpeg':
      case 'image/png':
        return 'far fa-3x fa-image secondary-text';
      default:
        return 'fas fa-3x fa-file-download primary-text';
    }
  }
}
