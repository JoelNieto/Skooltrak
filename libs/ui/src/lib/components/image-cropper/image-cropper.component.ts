import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

@Component({
  selector: 'skooltrak-image-cropper',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ImageCropperModule,
    TranslateModule,
    MatIconModule,
  ],
  template: `<h2 mat-dialog-title>{{ 'Profile picture' | translate }}</h2>
    <mat-dialog-content>
      <div class="row">
        <div class="col-md-12">
          <image-cropper
            [imageChangedEvent]="imgChangeEvt"
            [maintainAspectRatio]="true"
            [aspectRatio]="4 / 4"
            [resizeToWidth]="512"
            format="png"
            (imageCropped)="cropImg($event)"
            (imageLoaded)="imgLoad()"
            (cropperReady)="initCropper()"
            (loadImageFailed)="imgFailed()"
          />
        </div>
        <div class="col-md-6">
          <strong>Image Preview</strong>
          <br />
          <img [src]="cropImgPreview" [style.max-height]="'75px'" />
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close] color="warn">
        {{ 'Cancel' | translate }}
      </button>
      <button
        type="button"
        mat-flat-button
        color="accent"
        (click)="fileInput.click()"
        class="mx-2"
      >
        Choose Picture
      </button>
      <input
        hidden
        type="file"
        #fileInput
        accept="image/png, image/jpeg"
        (change)="onFileChange($event)"
      />
      <button
        mat-flat-button
        color="primary"
        cdkFocusInitial
        [mat-dialog-close]="{cropImgPreview, imageFile}"
      >
        {{ 'Save' | translate }}
      </button>
    </mat-dialog-actions> `,
  styles: ['image-cropper {max-height: 25rem}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCropperComponent {
  imgChangeEvt: any = '';

  cropImgPreview: any = '';

  imageFile: File | undefined;

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    if (e.base64) {
      const blob = this.dataURIToBlob(e.base64);
      this.imageFile = new File([blob], 'avatar.png', { type: 'image/png' });
    }
  }

  dataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  imgLoad() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }
}
