import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
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
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass'],
})
export class DocumentsComponent implements OnInit {
  @Input() assignment: Assignment;
  @ViewChild('actionsMenu') actionsMenu: TemplateRef<any>;
  documents$: Observable<UploadFile[]>;
  currentStudent: Student = undefined;
  sub: Subscription;
  overlayRef: OverlayRef | null;
  constructor(
    private assignmentService: AssignmentService,
    public filesService: FilesService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private modal: NgbModal,
    private transloco: TranslocoService,
    private session: SessionService,
    private documentService: DocumentsService
  ) {}

  ngOnInit(): void {
    this.documents$ = this.assignmentService.getDocuments(this.assignment.id);
  }

  openMenu({ x, y }: MouseEvent, user) {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.actionsMenu, this.viewContainerRef, {
        $implicit: user,
      })
    );

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(
        () => this.close(),
        (err) => console.error(err)
      );
  }

  close() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
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
      this.documentService.create(res).subscribe(
        () => {
          this.documents$ = this.assignmentService.getDocuments(
            this.assignment.id
          );
          Swal.fire(
            res.name,
            this.transloco.translate('File uploaded successfully'),
            'success'
          );
        },
        (err) => console.error(err)
      );
    });
  }
}
