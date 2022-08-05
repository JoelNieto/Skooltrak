import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { DataUtilService } from '@skooltrak-app/utils';

import { DatepickerComponent } from '../datepicker/datepicker.component';
import { RegexEnum } from '../enums/regex.enum';
import { SelectComponent } from '../select/select.component';
import { Column } from '../table/table-options';

@Component({
  selector: 'skooltrak-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent,
    DatepickerComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input() fields!: Column[];
  @Input() item?: any = {};

  form: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly util: DataUtilService
  ) {}

  ngOnInit(): void {
    this.resolveLists();
    this.generateForm();
  }

  generateForm(): void {
    this.fields
      .filter((x) => !x.readonly)
      .forEach((field) => {
        const control = new UntypedFormControl(this.item[field.name]);
        const validators: ValidatorFn[] = [];

        if (field.required) {
          validators.push(Validators.required);
        }

        if (field.type === 'email') {
          validators.push(Validators.pattern(RegexEnum.EMAIL));
        }

        if (field.type === 'mobile-phone') {
          validators.push(Validators.pattern(RegexEnum.MOBILE_PHONE));
        }

        if (field.type === 'home-phone') {
          validators.push(Validators.pattern(RegexEnum.HOME_PHONE));
        }

        if (validators.length) {
          control.setValidators(validators);
        }
        this.form.addControl(field.name, control);
      });
  }

  updateObject(event: any): void {
    this.fields
      .filter((x) => !x.readonly)
      .forEach((field) => {
        if (field.type === 'object' && this.item[field.objectID!]) {
          this.item[field.name] = this.util.filterById(
            field.list!,
            this.item[field.objectID!]
          );
          this.item[field.objectText!] =
            this.item[field.name][field.listDisplay];
        } else {
          this.item[field.name] = this.form.get(field.name)?.value;
        }
      });
  }

  setFile(file: any, field: Column): void {
    this.item[field.name] = file.target.files;
  }

  resolveLists(): void {
    this.fields
      .filter((x) => !x.readonly && x.asyncList)
      .forEach((field) => {
        field.asyncList!.subscribe({
          next: (data) => {
            field.list = field.listDisplay
              ? this.util.sortBy(data, field.listDisplay)
              : this.util.sortBy(data, 'name');
          },
          error: (err) => {
            console.error(err);
          },
        });
      });
  }

  validateForm(): void {
    if (this.form.valid) {
      this.activeModal.close();
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
