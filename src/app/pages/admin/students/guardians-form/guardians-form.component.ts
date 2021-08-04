import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guardians-form',
  templateUrl: './guardians-form.component.html',
  styleUrls: ['./guardians-form.component.sass'],
})
export class GuardiansFormComponent implements OnInit {
  @Input() form: FormGroup;
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

  ngOnInit(): void {}
}
