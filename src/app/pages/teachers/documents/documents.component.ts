import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DocumentsFormComponent } from 'src/app/shared/components/documents-form/documents-form.component';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { PersonalService } from 'src/app/shared/services/personal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass'],
})
export class DocumentsComponent implements OnInit {
  documents$: Observable<UploadFile[]>;

  constructor(
    private personalService: PersonalService,
    public filesService: FilesService,
    private documentService: DocumentsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.documents$ = this.personalService.getDocuments();
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
      case 'application/zip':
        return 'far fa-2x fa-file-archive secondary-text';
      default:
        return 'fas fa-2x fa-file-download primary-text';
    }
  }

  uploadFile() {
    const modalRef = this.modal.open(DocumentsFormComponent);
    modalRef.result.then((res) => {
      this.documentService.create(res).subscribe(
        (resp) => {
          Swal.fire(resp.name, 'Documento subido exitosamente', 'success');
          this.documents$ = this.personalService.getDocuments();
        },
        (err: Error) => {
          Swal.fire('Ocurrió un error', 'Intente nuevamente', 'error');
        }
      );
    });
  }
}
