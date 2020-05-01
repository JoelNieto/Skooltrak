import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilesService } from 'src/app/shared/services/files.service';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';
import { VideoPlayerComponent } from '../video-player.component';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.sass'],
})
export class UploaderComponent implements OnInit {
  @ViewChild(VideoPlayerComponent) player: VideoPlayerComponent;
  form: FormGroup;
  isLoading = false;
  video: any;
  videoURL: string;
  constructor(
    public modal: NgbActiveModal,
    private fileServ: FilesService,
    private fb: FormBuilder,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: [''],
    });
  }

  setFile(file: any): void {
    this.video = file;
    console.log(file.target.files[0]);
    this.videoURL = URL.createObjectURL(file.target.files[0]);
    this.player.resetPlayer({
      src: this.videoURL,
      type: file.target.files[0].type,
    });
    /* this.fileServ.uploadFile(file).subscribe(
      res => {
        this.form.get('file').setValue(res);
        this.form.get('title').setValue(res.fileName);
        this.isLoading = false;
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate('We are fixing this error. Try it later'),
          'error'
        );
        this.isLoading = false;
      }
    ); */
  }

  upload() {
    this.isLoading = true;
    this.fileServ.uploadFile(this.video).subscribe(
      (res) => {
        this.form.get('file').setValue(res);
        this.isLoading = false;
      },
      (err: Error) => {
        Swal.fire(
          this.transloco.translate('Something went wrong'),
          this.transloco.translate('We are fixing this error. Try it later'),
          'error'
        );
        this.isLoading = false;
      }
    );
  }
}
