import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { UploaderComponent } from 'src/app/shared/components/video-player/uploader/uploader.component';
import { Course } from 'src/app/shared/models/studyplans.model';
import { Video } from 'src/app/shared/models/videos.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { VideosService } from 'src/app/shared/services/videos.service';
import Swal from 'sweetalert2';
import { ModalPlayerComponent } from 'src/app/shared/components/video-player/modal-player/modal-player.component';

@Component({
  selector: 'app-courses-videos',
  templateUrl: './courses-videos.component.html',
  styleUrls: ['./courses-videos.component.sass'],
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
    const modalRef = this.modal.open(ModalPlayerComponent, {size: 'lg'});
    modalRef.componentInstance.videoInfo = videoInfo;
  }

  addVideo() {
    const modalRef = this.modal.open(UploaderComponent, { size: 'md' });
    modalRef.result.then((res: Video) => {
      res.course = this.course;
      this.videoService.create(res).subscribe((resp) => {
        this.videos$ = this.coursesService.getVideos(this.course.id);
        Swal.fire(
          resp.title,
          this.transloco.translate('Created item', {
            value: this.transloco.translate('Video'),
          }),
          'success'
        );
      });
    });
  }
}
