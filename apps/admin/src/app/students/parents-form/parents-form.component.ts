import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { CountrySelectorComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-parents-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocompleteModule,
    CountrySelectorComponent,
  ],
  templateUrl: './parents-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentsFormComponent implements OnInit {
  @Input() formGroupName!: string;
  form!: FormGroup;
  constructor(private parent: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.parent.form.get(this.formGroupName) as FormGroup;
  }
}
