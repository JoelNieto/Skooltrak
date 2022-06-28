import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string): SafeHtml {
    value = value.replace(/<img[^>]*>/g, '');
    value = value.replace(/<br[^>]*>/g, '');
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
