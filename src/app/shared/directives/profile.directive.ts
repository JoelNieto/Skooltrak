import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appProfile]',
})
export class ProfileDirective {
  constructor(private readonly el: ElementRef) {}
}
