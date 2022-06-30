import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'skooltrak-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass'],
})
export class ContactFormComponent {
  @Input() form: UntypedFormGroup;
  @Input() index: number;

  types: string[] = [
    'Email',
    'Phone number',
    'Instagram',
    'Twitter',
    'Facebook',
    'Web site',
    'Fax',
  ];
  constructor() {}
}