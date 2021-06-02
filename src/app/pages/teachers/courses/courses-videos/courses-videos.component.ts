import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { ModalPlayerComponent } from 'src/app/shared/components/video-player/modal-player/modal-player.component';
import { UploaderComponent } from 'src/app/shared/components/video-player/uploader/uploader.component';
import { Course } from 'src/app/shared/models/studyplans.model';
import { Video } from 'src/app/shared/models/videos.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { VideosService } from 'src/app/shared/services/videos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-videos',
  templateUrl: './courses-videos.component.html',
  styleUrls: ['./courses-videos.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        query('.col-md-3', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(30, animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
        ]),
      ]),
    ]),
  ],
})
export class CoursesVideosComponent implements OnInit {
  @Input() course: Course;

  videos$: Observable<Video[]>;
  constructor(
    private modal: NgbModal,
    private coursesService: CoursesService,
    private videoService: VideosService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.videos$ = this.coursesService.getVideos(this.course.id);
  }

  openVideo(videoInfo: Video) {
    const modalRef = this.modal.open(ModalPlayerComponent, { size: 'lg' });
    modalRef.componentInstance.videoInfo = videoInfo;
  }

  addVideo() {
    const modalRef = this.modal.open(UploaderComponent, { size: 'md' });
    modalRef.result.then((res: Video) => {
      this.videoService.create(res).subscribe(
        (resp) => {
          this.videos$ = this.coursesService.getVideos(this.course.id);
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
    modalRef.componentInstance.course = this.course;
  }

  editVideo(video: Video) {
    const modalRef = this.modal.open(UploaderComponent, { size: 'md' });
    modalRef.result.then((res: Video) => {
      this.videoService.edit(res.id, res).subscribe(
        () => {
          this.videos$ = this.coursesService.getVideos(this.course.id);
          Swal.fire(
            res.title,
            this.transloco.translate('Updated item', {
              value: this.transloco.translate('Video'),
            }),
            'success'
          );
        },
        (err) => console.log(err)
      );
    });
    modalRef.componentInstance.video = video;
  }

  async deleteVideo(id: string) {
    const result = await Swal.fire<Promise<boolean>>({
      title: this.transloco.translate('Wanna delete this video?'),
      text: this.transloco.translate('This cannot be reversed'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Yes, delete'),
    });
    if (result.value) {
      this.videoService.delete(id).subscribe(
        () => {
          this.videos$ = this.coursesService.getVideos(this.course.id);
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Content'),
            }),
            '',
            'info'
          );
        },
        (err) => console.log(err)
      );
    }
  }
}
