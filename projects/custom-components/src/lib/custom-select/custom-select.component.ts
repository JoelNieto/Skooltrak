import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ArrayPipe } from '../array.pipe';
import { UtilService } from '../util.service';

@Component({
  selector: 'sk-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent
  implements OnInit, ControlValueAccessor, OnChanges {
  @Input() multiple = false;
  @Input() items: any[];
  @Input() search: false;
  @Input() displayValue: string;
  @Input() placeholder = 'Insert value';
  @Input() objectId = 'id';
  showDropdown = false;
  currentValue: any | any[];
  arrayPipe = new ArrayPipe();
  inputDisplay: string;
  constructor(private util: UtilService) {}

  ngOnInit() {
    if (this.multiple) {
      this.currentValue = [];
    } else {
      this.currentValue = {};
    }
  }

  ngOnChanges(model: SimpleChanges) {
    if (model.items) {
      if (this.items) {
        this.items.forEach(x => {
          if (this.multiple) {
            if (
              this.currentValue &&
              this.util.filterById(this.currentValue, x[this.objectId])
            ) {
              x.selected = true;
            } else {
              x.selected = false;
            }
          }
        });
        this.items = this.util.sortBy(this.items, this.displayValue);
      }
    }
  }

  toggleShow(): void {
    this.showDropdown = !this.showDropdown;
  }

  get value(): any | any[] {
    return this.currentValue;
  }

  onChange = (value: any | any[]) => {};

  change() {
    this.inputDisplay = this.arrayPipe.transform(this.value, this.displayValue);
    this.onChange(this.value);
  }

  toggleItem(item: any) {
    item.selected = !item.selected;
    if (this.multiple) {
      if (item.selected) {
        this.currentValue.push(item);
      } else {
        this.currentValue = this.util.removeById(this.currentValue, item.id);
      }
    } else {
      this.currentValue = item;
    }

    this.change();
  }

  onTouched = () => {};

  writeValue(val: any | any[]): void {
    if (val) {
      this.currentValue = val;
      this.onChange(this.value);
      this.change();
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
