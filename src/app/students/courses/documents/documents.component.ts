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
import { SessionService } from 'src/app/shared/services/session.service';
import { RoleType } from 'src/app/shared/enums/role.enum';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass']
})
export class DocumentsComponent implements OnInit {
  @Input() course: Course;
  documents: Observable<UploadFile[]>;
  constructor(
    private courseService: CoursesService,
    private documentsService: DocumentsService,
    public filesService: FilesService,
    private transloco: TranslocoService,
    private session: SessionService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.documents = this.courseService.getDocuments(this.course.id);
  }

  showModal() {
    this.modal.open(DocumentsFormComponent).result.then((res: UploadFile) => {
      res.course = { id: this.course.id, name: this.course.name };
      res.student = this.session.currentUser.people[0];
      this.documentsService.create(res).subscribe(() => {
        Swal.fire(
          res.name,
          this.transloco.translate('File uploaded successfully'),
          'success'
        );
        this.documents = this.courseService.getDocuments(this.course.id);
      });
    });
  }

  showFile(file: UploadFile): boolean {
    if (file.createUser.role.code === RoleType.Teacher) {
      return true;
    }

    return file.createUser.id === this.session.currentUser.id;
  }

  getFileIcon(file: UploadFile): string {
    switch (file.file.type) {
      case 'application/pdf':
        return 'far fa-2x fa-file-pdf danger-text';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'far fa-2x fa-file-excel success-text';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'far fa-2x fa-file-word primary-text';
      case 'image/jpeg':
      case 'image/png':
        return 'far fa-2x fa-image secondary-text';
      case 'audio/mpeg':
        return 'far fa-2x fa-file-audio secondary-text';
      default:
        return 'fas fa-2x fa-file-download primary-text';
    }
  }
}
