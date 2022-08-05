import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'skooltrak-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() maxDate: NgbDateStruct = {
    year: new Date().getFullYear() - 5,
    month: 1,
    day: 1,
  };
  @Input() minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: 12,
    day: 31,
  };
  @Input() required: boolean = false;
  currentDate!: NgbDateStruct | null;
  disabled: boolean = false;

  constructor(private formatter: NgbDateParserFormatter) {}

  get value(): Date {
    return new Date(this.formatter.format(this.currentDate));
  }

  onChange = (date: any): void => {};

  change(): void {
    this.onChange(this.value);
  }

  onTouched = (): void => {};

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
