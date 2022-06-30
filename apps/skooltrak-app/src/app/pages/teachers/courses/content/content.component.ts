import '../../../../../vendor/scripts/jitsi.js';

import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { ContentFormComponent } from 'src/app/shared/components/content-form/content-form.component';
import { Content } from 'src/app/shared/models/content.model';
import { Course } from 'src/app/shared/models/studyplans.model';
import { ContentService } from 'src/app/shared/services/content.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
})
export class ContentComponent implements OnInit {
  @Input() course: Course;

  contents$: Observable<Content[]>;

  constructor(
    private courseService: CoursesService,
    private contentService: ContentService,
    private transloco: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.contents$ = this.courseService.getContent(this.course.id);
  }

  addContent() {
    this.modal
      .open(ContentFormComponent, { size: 'xl' })
      .result.then((res: Content) => {
        res.course = this.course;
        this.contentService.create(res).subscribe({
          next: (response) => {
            Swal.fire(
              response.title,
              this.transloco.translate('Created item', {
                value: this.transloco.translate('Content'),
              }),
              'success'
            );
            this.contents$ = this.courseService.getContent(this.course.id);
          },
          error: (err: Error) => {
            Swal.fire(
              this.transloco.translate('Something went wrong'),
              this.transloco.translate(err.message),
              'error'
            );
          },
        });
      })
      .catch(() => {});
  }

  editContent(content: Content) {
    const modalRef = this.modal.open(ContentFormComponent, {
      size: 'xl',
      beforeDismiss: async () => {
        const result = await Swal.fire({
          title: this.transloco.translate('Your changes gonna be erased'),
          text: this.transloco.translate('Wanna quit without saving?'),
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#E53E3E',
          cancelButtonColor: '#718096',
          cancelButtonText: this.transloco.translate('Cancel'),
          confirmButtonText: this.transloco.translate('Confirm quit'),
        });

        return result.isConfirmed;
      },
    });
    modalRef.result
      .then((res: Content) => {
        this.contentService.edit(res.id, res).subscribe({
          next: () => {
            Swal.fire(
              res.title,
              this.transloco.translate('Updated item', {
                value: this.transloco.translate('Content'),
              }),
              'success'
            );
            this.contents$ = this.courseService.getContent(this.course.id);
          },
          error: (err: Error) => {
            Swal.fire(
              this.transloco.translate('Something went wrong'),
              this.transloco.translate(err.message),
              'error'
            );
          },
        });
      })
      .catch(() => {});
    modalRef.componentInstance.content = content;
  }

  async deleteContent(id: string) {
    const result = await Swal.fire({
      title: this.transloco.translate('Wanna delete item?'),
      text: this.transloco.translate('This cant be undone'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Confirm delete'),
    });
    if (result.isConfirmed) {
      this.contentService.delete(id).subscribe({
        next: () => {
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Content'),
            }),
            '',
            'info'
          );
          this.contents$ = this.courseService.getContent(this.course.id);
        },
        error: (err) => console.error(err),
      });
    }
  }
}