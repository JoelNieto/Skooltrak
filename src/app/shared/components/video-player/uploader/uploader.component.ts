import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/studyplans.model';
import { Video } from 'src/app/shared/models/videos.model';
import { FilesService } from 'src/app/shared/services/files.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';
import Swal from 'sweetalert2';

import { VideoPlayerComponent } from '../video-player.component';

@Component({
  selector: 'skooltrak-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass'],
})
export class UploaderComponent implements OnInit {
  @Input() video: Video;
  @Input() course: Course;
  @ViewChild(VideoPlayerComponent) player: VideoPlayerComponent;
  form: FormGroup;
  isLoading = false;
  videoFile: any;
  videoURL: string;
  courses$: Observable<Course[]>;

  constructor(
    public modal: NgbActiveModal,
    private teacherService: TeachersService,
    private fileServ: FilesService,
    private fb: FormBuilder,
    private session: SessionService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.video ? this.video.id : ''],
      file: [this.video ? this.video.file : '', [Validators.required]],
      title: [this.video ? this.video.title : '', [Validators.required]],
      courses: [this.video ? this.video.courses : ''],
      description: [this.video ? this.video.description : ''],
      published: [this.video ? this.video.published : false],
    });
    if (this.course) {
      this.form.get('courses').setValue([this.course]);
    }
    this.courses$ = this.teacherService.getCourses(
      this.session.currentTeacher.id
    );
  }

  setFile(file: any): void {
    this.videoFile = file;
    this.videoURL = URL.createObjectURL(file.target.files[0]);
    this.player.resetPlayer({
      src: this.videoURL,
      type: file.target.files[0].type,
    });
  }

  upload() {
    this.isLoading = true;
    this.fileServ.uploadFile(this.videoFile).subscribe({
      next: (res) => {
        this.form.get('file').setValue(res);
        this.isLoading = false;
      },
      error: (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate('We are fixing this error. Try it later'),
          'error'
        );
        this.isLoading = false;
      },
    });
  }
}
