import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'skooltrak-guardians-form',
  templateUrl: './guardians-form.component.html',
  styleUrls: ['./guardians-form.component.sass'],
})
export class GuardiansFormComponent {
  @Input() form: UntypedFormGroup;
  @Input() index: number;

  relations: string[] = [
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Uncle',
    'Aunt',
    'Grandpa',
    'Grandma',
    'Other',
  ];
  constructor() {}
}
