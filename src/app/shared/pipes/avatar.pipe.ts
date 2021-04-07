import { Pipe, PipeTransform } from '@angular/core';
import { FilesService } from '../services/files.service';

@Pipe({
  name: 'avatar',
  pure: false
})
export class AvatarPipe implements PipeTransform {
  constructor(private file: FilesService) {}
  transform(value: string): string {
    if (value) {
      if (this.isValidURL(value)) {
        return `<img src="${value}" alt="avatar" appImageFallback class="avatar">`;
      } else {
        return `<img src="${this.file.getFile(
          value
        )}" alt="avatar" appImageFallback class="avatar">`;
      }
    } else {
      return `<img src="assets/img/default-avatar.png" alt="avatar" class="avatar">`;
    }
  }

  isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
}
