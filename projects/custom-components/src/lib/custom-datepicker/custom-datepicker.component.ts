import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sk-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatepickerComponent),
      multi: true,
    },
  ],
})
export class CustomDatepickerComponent implements ControlValueAccessor {
  @Input() maxDate: NgbDateStruct;
  @Input() minDate: NgbDateStruct;
  @Input() required: boolean;
  currentDate: NgbDateStruct;
  disabled: boolean;

  constructor(private formatter: NgbDateParserFormatter) {}

  get value(): Date {
    return new Date(this.formatter.format(this.currentDate));
  }

  onChange = (date: any) => {};

  change() {
    this.onChange(this.value);
  }

  onTouched = () => {};

  writeValue(date: Date): void {
    if (date) {
      this.currentDate = this.formatter.parse(date.toString());
      this.onChange(this.value);
    }
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
