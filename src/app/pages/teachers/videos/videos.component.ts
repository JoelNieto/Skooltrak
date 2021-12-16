import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { ModalPlayerComponent } from 'src/app/shared/components/video-player/modal-player/modal-player.component';
import { UploaderComponent } from 'src/app/shared/components/video-player/uploader/uploader.component';
import { Video } from 'src/app/shared/models/videos.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import { VideosService } from 'src/app/shared/services/videos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.sass'],
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
export class VideosComponent implements OnInit {
  videos$: Observable<Video[]>;
  constructor(
    private session: SessionService,
    private teacherService: TeachersService,
    private videoService: VideosService,
    private transloco: TranslocoService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.videos$ = this.teacherService.getVideos(
      this.session.currentTeacher.id
    );
  }

  openVideo(videoInfo: Video) {
    const modalRef = this.modal.open(ModalPlayerComponent, { size: 'lg' });
    modalRef.componentInstance.videoInfo = videoInfo;
  }

  editVideo(video: Video) {
    const modalRef = this.modal.open(UploaderComponent, { size: 'md' });
    modalRef.result.then((res: Video) => {
      this.videoService.edit(res.id, res).subscribe(
        () => {
          this.videos$ = this.teacherService.getVideos(
            this.session.currentTeacher.id
          );
          Swal.fire(
            res.title,
            this.transloco.translate('Updated item', {
              value: this.transloco.translate('Video'),
            }),
            'success'
          );
        },
        (err) => console.error(err)
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
          Swal.fire(
            this.transloco.translate('Deleted item', {
              value: this.transloco.translate('Content'),
            }),
            '',
            'info'
          );
        },
        (err) => console.error(err)
      );
    }
  }
}
