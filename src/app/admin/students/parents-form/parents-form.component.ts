import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-parents-form',
  templateUrl: './parents-form.component.html',
  styleUrls: ['./parents-form.component.sass']
})
export class ParentsFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() index: number;
  constructor() {}

  ngOnInit() {}
}
