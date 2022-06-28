import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'skooltrak-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['./medical-info.component.sass'],
})
export class MedicalInfoComponent {
  @Input() form: UntypedFormGroup;
  groups: string[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  constructor() {}
}
