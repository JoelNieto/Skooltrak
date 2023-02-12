import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
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
    CountrySelectorComponent,
  ],
  template: `
    <form [formGroup]="form" class="row">
      <div class="col-md-4">
        <mat-form-field>
          <mat-label>{{ 'Name' | translate }}</mat-label>
          <input type="text" formControlName="name" matInput />
        </mat-form-field>
      </div>
      <div class="col-md-4">
        <mat-form-field>
          <mat-label>{{ 'Email' | translate }}</mat-label>
          <input type="email" matInput formControlName="email" />
        </mat-form-field>
      </div>
      <div class="col-md-2">
        <mat-form-field>
          <mat-label>{{ 'Phone number' | translate }}</mat-label>
          <input type="tel" matInput formControlName="phoneNumber" />
        </mat-form-field>
      </div>
      <div class="col-md-2">
        <mat-form-field>
          <mat-label>{{ 'Mobile phone' | translate }}</mat-label>
          <input type="tel" matInput formControlName="mobileNumber" />
        </mat-form-field>
      </div>
      <div class="col-md-4">
        <skooltrak-country-selector
          formControlName="nationality"
        ></skooltrak-country-selector>
      </div>
      <div class="col-md-4">
        <mat-form-field>
          <mat-label>{{ 'Document ID' | translate }}</mat-label>
          <input type="text" matInput formControlName="documentId" />
        </mat-form-field>
      </div>
      <div class="col-md-4">
        <mat-form-field>
          <mat-label>{{ 'Address' | translate }}</mat-label>
          <input type="text" matInput formControlName="address" />
        </mat-form-field>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentsFormComponent implements OnInit {
  @Input() formGroupName!: string;
  form!: FormGroup;
  private parent = inject(FormGroupDirective);

  ngOnInit(): void {
    this.form = this.parent.form.get(this.formGroupName) as FormGroup;
  }
}
