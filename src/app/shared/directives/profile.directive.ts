import { Directive, ElementRef, OnInit } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Directive({
  selector: '[appProfile]',
})
export class ProfileDirective implements OnInit {
  constructor(private readonly el: ElementRef) {}

  ngOnInit(): void {}
}
