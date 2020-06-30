import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { AssignmentFormComponent } from 'src/app/shared/components/assignment-form/assignment-form.component';
import { DocumentsFormComponent } from 'src/app/shared/components/documents-form/documents-form.component';
import { UploaderComponent } from 'src/app/shared/components/video-player/uploader/uploader.component';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { Video } from 'src/app/shared/models/videos.model';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { VideosService } from 'src/app/shared/services/videos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent implements OnInit {
  $assignment: Observable<Assignment>;
  $documents: Observable<UploadFile[]>;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private transloco: TranslocoService,
    private documentsService: DocumentsService,
    private videosService: VideosService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.$assignment = this.assignmentService.get(params.id);
      this.$documents = this.assignmentService.getDocuments(params.id);
    });
  }

  editAssignment(assignment: Assignment): void {
    const modalRef = this.modal.open(AssignmentFormComponent, { size: 'lg' });
    modalRef.result.then(
      (res: Assignment) => {
        this.assignmentService.edit(res.id, res).subscribe(
          () => {
            Swal.fire(
              res.title,
              this.transloco.translate('Updated item', {
                value: this.transloco.translate('Assignment'),
              }),
              'success'
            );
            this.$assignment = this.assignmentService.get(res.id);
          },
          (err: Error) => {
            Swal.fire(
              this.transloco.translate('Something went wrong'),
              this.transloco.translate(err.message),
              'error'
            );
          }
        );
      },
      (reasons: string) => {}
    );
    modalRef.componentInstance.assignment = assignment;
  }

  addVideo(assignment: Assignment) {
    const modalRef = this.modal.open(UploaderComponent, { size: 'md' });
    modalRef.result.then((res: Video) => {
      res.assignment = { id: assignment.id, name: assignment.title };
      this.videosService.create(res).subscribe(
        (resp) => {
          Swal.fire(
            resp.title,
            this.transloco.translate('Created item', {
              value: this.transloco.translate('Video'),
            }),
            'success'
          );
        },
        (err: Error) => {
          Swal.fire(
            this.transloco.translate('Something went wrong'),
            this.transloco.translate(err.message),
            'error'
          );
        }
      );
    });
    modalRef.componentInstance.course = assignment.course;
  }

  addDocument(assignment: Assignment) {
    this.modal.open(DocumentsFormComponent).result.then((res: UploadFile) => {
      res.course = { id: assignment.course.id, name: assignment.course.name };
      res.assignment = { id: assignment.id, name: assignment.title };
      this.documentsService.create(res).subscribe(() => {
        Swal.fire(
          res.name,
          this.transloco.translate('File uploaded successfully'),
          'success'
        );
      });
    });
  }
}
