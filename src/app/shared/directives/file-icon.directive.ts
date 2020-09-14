import { Directive, ElementRef, Input } from '@angular/core';

import { UploadFile } from '../models/documents.model';

@Directive({
  selector: '[appFileIcon]',
})
export class FileIconDirective {
  constructor(
    private elr: ElementRef,
  ) {}

  @Input() set appFileIcon(file: UploadFile) {
    let icon: string;
    switch (file.file.type) {
      case 'application/pdf':
        icon = 'pdf';
        break;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        icon = 'xls';
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        icon = 'txt';
        break;
      case 'image/jpeg':
        icon = 'jpg';
        break;
      case 'image/png':
        icon = 'jpg';
        break;
      default:
        icon = 'txt';
    }
    this.elr.nativeElement.src = `/assets/icons/file-${icon}.svg`;
  }
}
