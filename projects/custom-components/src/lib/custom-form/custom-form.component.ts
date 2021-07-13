import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Column } from '../custom-table/table-options';
import { RegexEnum } from '../enums/regex.enum';
import { UtilService } from '../util.service';

@Component({
  selector: 'sk-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.sass'],
})
export class CustomFormComponent implements OnInit {
  @Input() fields: Column[];
  @Input() item?: any = {};

  form: FormGroup = new FormGroup({});

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly util: UtilService
  ) {}

  ngOnInit() {
    this.resolveLists();
    this.generateForm();
  }

  generateForm() {
    this.fields
      .filter((x) => !x.readonly)
      .forEach((field) => {
        const control = new FormControl(this.item[field.name]);
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

  updateObject(event) {
    console.info('update', this.item);
    console.info('update form', this.form.value);
    this.fields
      .filter((x) => !x.readonly)
      .forEach((field) => {
        if (field.type === 'object' && this.item[field.objectID]) {
          this.item[field.name] = this.util.filterById(
            field.list,
            this.item[field.objectID]
          );
          this.item[field.objectText] =
            this.item[field.name][field.listDisplay];
        } else {
          this.item[field.name] = this.form.get(field.name).value;
        }
      });
  }

  setFile(file: any, field: Column) {
    this.item[field.name] = file.target.files;
  }

  resolveLists(): void {
    this.fields
      .filter((x) => !x.readonly && x.asyncList)
      .forEach((field) => {
        field.asyncList.subscribe(
          (data) => {
            field.list = field.listDisplay
              ? this.util.sortBy(data, field.listDisplay)
              : this.util.sortBy(data, 'name');
          },
          (err) => {
            console.error(err);
          }
        );
      });
  }

  validateForm() {
    if (this.form.valid) {
      this.activeModal.close();
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
