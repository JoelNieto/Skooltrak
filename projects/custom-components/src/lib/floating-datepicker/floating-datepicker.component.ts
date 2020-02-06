import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NgbDateParserFormatter,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sk-floating-datepicker',
  templateUrl: './floating-datepicker.component.html',
  styleUrls: ['./floating-datepicker.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingDatepickerComponent),
      multi: true
    }
  ]
})
export class FloatingDatepickerComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() id: string;
  @Input() maxDate: NgbDateStruct;
  @Input() minDate: NgbDateStruct;
  @Input() required: boolean;
  current: NgbDateStruct;
  constructor(private formatter: NgbDateParserFormatter) {}

  get value(): Date {
    return new Date(this.formatter.format(this.current));
  }

  onChange = (date: any) => {};

  change() {
    this.onChange(this.value);
  }

  onTouched = () => {};

  writeValue(date: Date): void {
    if (date) {
      this.current = this.formatter.parse(date.toString());
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
