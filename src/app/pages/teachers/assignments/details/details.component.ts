import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { isSameWeek } from 'date-fns';
import { Observable } from 'rxjs';
import { AssignmentFormComponent } from 'src/app/shared/components/assignment-form/assignment-form.component';
import { DocumentsFormComponent } from 'src/app/shared/components/documents-form/documents-form.component';
import { ModalPlayerComponent } from 'src/app/shared/components/video-player/modal-player/modal-player.component';
import { UploaderComponent } from 'src/app/shared/components/video-player/uploader/uploader.component';
import { RoleType } from 'src/app/shared/enums/role.enum';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { Video } from 'src/app/shared/models/videos.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { VideosService } from 'src/app/shared/services/videos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  assignment$: Observable<Assignment>;
  documents$: Observable<UploadFile[]>;
  videos$: Observable<Video[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentService,
    private transloco: TranslocoService,
    public filesService: FilesService,
    private documentsService: DocumentsService,
    private videosService: VideosService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.initAssignment();
  }

  initAssignment(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.assignment$ = this.assignmentService.get(params.id);
        this.videos$ = this.assignmentService.getVideos(params.id);
        this.documents$ = this.assignmentService.getDocuments(params.id);
      },
      error: (err) => console.error(err),
    });
  }

  teacherDoc(doc: UploadFile) {
    return doc.createUser.role.code === RoleType.Teacher;
  }

  editAssignment(assignment: Assignment): void {
    if (isSameWeek(assignment.startDate, new Date())) {
      Swal.fire(
        'Acción denegada',
        'No puede edita esta asignación en la semana corriente',
        'info'
      );
    } else {
      const modalRef = this.modal.open(AssignmentFormComponent, { size: 'lg' });
      modalRef.result.then(
        (res: Assignment) => {
          this.assignmentService.edit(res.id, res).subscribe({
            next: () => {
              Swal.fire(
                res.title,
                this.transloco.translate('Updated item', {
                  value: this.transloco.translate('Assignment'),
                }),
                'success'
              );
              this.assignment$ = this.assignmentService.get(res.id);
            },
            error: (err: Error) => {
              Swal.fire(
                this.transloco.translate('Something went wrong'),
                this.transloco.translate(err.message),
                'error'
              );
            },
          });
        },
        (reasons: string) => {}
      );
      modalRef.componentInstance.assignment = assignment;
    }
  }

  async deleteAssignment(id: string) {
    const result = await Swal.fire<Promise<boolean>>({
      title: this.transloco.translate('Wanna delete this assignment?'),
      text: this.transloco.translate('This cannot be reversed'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Yes, delete'),
    });

    if (result.value) {
      this.assignmentService.delete(id).subscribe({
        next: () => {
          this.router.navigate(['./'], { relativeTo: this.route.parent });
          Swal.fire(
            this.transloco.translate('Deleted itemf', {
              value: this.transloco.translate('Assignment'),
            }),
            '',
            'info'
          );
        },
        error: (err) => console.error(err),
      });
    }
  }

  addVideo(assignment: Assignment) {
    const modalRef = this.modal.open(UploaderComponent, { size: 'md' });
    modalRef.result.then((res: Video) => {
      res.assignment = { id: assignment.id, name: assignment.title };
      this.videosService.create(res).subscribe({
        next: (resp) => {
          this.initAssignment();
          Swal.fire(
            resp.title,
            this.transloco.translate('Created item', {
              value: this.transloco.translate('Video'),
            }),
            'success'
          );
        },
        error: (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        },
      });
    });
    modalRef.componentInstance.course = assignment.course;
  }

  addDocument(assignment: Assignment) {
    this.modal.open(DocumentsFormComponent).result.then((res: UploadFile) => {
      res.course = { id: assignment.course.id, name: assignment.course.name };
      res.assignment = { id: assignment.id, name: assignment.title };
      this.documentsService.create(res).subscribe({
        next: () => {
          this.initAssignment();
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

  deleteDocument(document: UploadFile, id: string) {
    this.documentsService.delete(document.id).subscribe({
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

  async deleteVideo(id: string) {
    const result = await Swal.fire({
      title: this.transloco.translate('Wanna delete this video?'),
      text: this.transloco.translate('This cannot be reversed'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Yes, delete'),
    });
    if (result.isConfirmed) {
      this.videosService.delete(id).subscribe({
        next: () => {
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Content'),
            }),
            '',
            'info'
          );
        },
        error: (err) => console.error(err),
      });
    }
  }

  openVideo(videoInfo: Video) {
    const modalRef = this.modal.open(ModalPlayerComponent, { size: 'lg' });
    modalRef.componentInstance.videoInfo = videoInfo;
  }
}
