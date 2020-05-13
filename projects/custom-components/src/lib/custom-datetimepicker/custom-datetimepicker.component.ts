import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sk-custom-datetimepicker',
  templateUrl: './custom-datetimepicker.component.html',
  styleUrls: ['./custom-datetimepicker.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatetimepickerComponent),
      multi: true,
    },
  ],
})
export class CustomDatetimepickerComponent implements ControlValueAccessor {
  currentDate: NgbDateStruct;
  constructor(private formatter: NgbDateParserFormatter) {}

  get value(): Date {
    return new Date(this.formatter.format(this.currentDate));
  }

  onChange = (date: any) => {};

  change() {
    this.onChange(this.value);
  }

  writeValue(date: Date): void {
    if (date) {
      this.currentDate = this.formatter.parse(date.toString());
      this.onChange(this.value);
    }
  }

  onTouched = () => {};

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
