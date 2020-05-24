import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from 'src/app/shared/models/videos.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'app-videos',
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
    private teacherService: TeachersService
  ) {}

  ngOnInit(): void {
    this.videos$ = this.teacherService.getVideos(
      this.session.currentTeacher.id
    );
  }
}
