import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ModalPlayerComponent } from 'src/app/shared/components/video-player/modal-player/modal-player.component';
import { Course } from 'src/app/shared/models/studyplans.model';
import { Video } from 'src/app/shared/models/videos.model';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'skooltrak-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        query('.col-md-4', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(30, animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
        ]),
      ]),
    ]),
  ],
})
export class VideosComponent implements OnInit {
  @Input() course: Course;

  videos$: Observable<Video[]>;
  constructor(private courseService: CoursesService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.videos$ = this.courseService.getVideos(this.course.id);
  }

  openVideo(videoInfo: Video) {
    const modalRef = this.modal.open(ModalPlayerComponent, { size: 'lg' });
    modalRef.componentInstance.videoInfo = videoInfo;
  }
}
