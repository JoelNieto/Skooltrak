import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.sass'],
})
export class MedicalInfoComponent implements OnInit {
  @Input() form: FormGroup;
  groups: string[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  constructor() {}

  ngOnInit(): void {}
}
