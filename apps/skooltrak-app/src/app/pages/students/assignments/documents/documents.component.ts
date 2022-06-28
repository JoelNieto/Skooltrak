import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { DocumentsFormComponent } from 'src/app/shared/components/documents-form/documents-form.component';
import { RoleType } from 'src/app/shared/enums/role.enum';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { Student } from 'src/app/shared/models/students.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass'],
})
export class DocumentsComponent implements OnInit {
  @Input() assignment: Assignment;

  documents$: Observable<UploadFile[]>;
  currentStudent: Student = undefined;

  constructor(
    private assignmentService: AssignmentService,
    public filesService: FilesService,
    private modal: NgbModal,
    private transloco: TranslocoService,
    private session: SessionService,
    private documentService: DocumentsService
  ) {}

  ngOnInit(): void {
    this.documents$ = this.assignmentService.getDocuments(this.assignment.id);
  }

  teacherDoc(doc: UploadFile) {
    return doc.createUser.role.code === RoleType.Teacher;
  }

  addDocument() {
    this.modal.open(DocumentsFormComponent).result.then((res: UploadFile) => {
      res.course = {
        id: this.assignment.course.id,
        name: this.assignment.course.name,
      };
      res.assignment = { id: this.assignment.id, name: this.assignment.title };
      res.student = {
        id: this.session.currentStudent.id,
        name: this.session.currentStudent.shortName,
      };
      this.documentService.create(res).subscribe({
        next: () => {
          this.documents$ = this.assignmentService.getDocuments(
            this.assignment.id
          );
          Swal.fire(
            res.name,
            this.transloco.translate('File uploaded successfully'),
            'success'
          );
        },
        error: (err) => console.error(err),
      });
    });
  }

  async deleteDocument(document: UploadFile, id: string) {
    const result = await Swal.fire<Promise<boolean>>({
      title: this.transloco.translate('Wanna delete this file?'),
      text: this.transloco.translate('This cannot be reversed'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Yes, delete'),
    });
    if (result.isConfirmed) {
      this.documentService.delete(document.id).subscribe({
        next: () => {
          this.documents$ = this.assignmentService.getDocuments(id);
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Document'),
            }),
            '',
            'info'
          );
        },
        error: (err) => console.error(err),
      });
    }
  }
}
