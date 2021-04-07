import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
})
export class ImageFallbackDirective {
  @Input() appImgFallback: string;
  constructor(private ref: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = this.ref
      .nativeElement as HTMLImageElement;
    element.src = this.appImgFallback || '/assets/img/default-avatar.png';
  }
}
