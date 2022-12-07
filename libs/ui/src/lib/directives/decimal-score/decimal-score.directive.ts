import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[decimalScore]',
  standalone: true,
})
export class DecimalScoreDirective {
  private regex = new RegExp(/^\d*\.?\d*$/g);
  private specialKeys = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];
  private el = inject(ElementRef);
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const { key } = event;
    if (this.specialKeys.indexOf(key) !== -1) {
      return;
    }

    if (!String(key).match(this.regex)) {
      event.preventDefault();
      return;
    }
  }

  @HostListener('focusout', ['$event'])
  onFocusout() {
    this.el.nativeElement.value = Number(this.el.nativeElement.value).toFixed(
      2
    );
  }
}
