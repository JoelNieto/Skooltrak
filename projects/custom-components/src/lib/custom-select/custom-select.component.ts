import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ArrayPipe } from '../pipes/array.pipe';
import { UtilService } from '../util.service';

@Component({
  selector: 'sk-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent
  implements OnInit, ControlValueAccessor, OnChanges
{
  @Input() multiple = false;
  @Input() items: any[];
  @Input() search = true;
  @Input() displayValue: string;
  @Input() secondaryDisplay: string;
  @Input() placeholder = 'Insert value';
  @Input() objectId = 'id';
  showDropdown = false;
  currentValue: any | any[];
  arrayPipe = new ArrayPipe();
  filterValue: string;
  inputDisplay: string;
  filteredItems: any[];
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
        this.filteredItems = [...this.items];
        if (this.multiple) {
          this.items.forEach((x) => {
            if (
              this.currentValue &&
              this.util.filterById(
                this.currentValue,
                x[this.objectId],
                this.objectId
              )
            ) {
              x.selected = true;
            } else {
              x.selected = false;
            }
          });
        } else {
          this.items
            .filter(
              (x) => x[this.objectId] === this.currentValue[this.objectId]
            )
            .map((x) => {
              x.selected = true;
              return x;
            });
        }
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
    this.onChange(this.value);
  }

  valueDisplay(): string {
    if (this.multiple) {
      return this.arrayPipe.transform(this.value, this.displayValue);
    } else {
      if (this.value && this.value[this.displayValue]) {
        return `<bold>${this.value[this.displayValue]}</bold>`;
      } else {
        return null;
      }
    }
  }

  clearAll() {
    if (this.multiple) {
      this.currentValue = [];
    } else {
      this.currentValue = null;
    }

    this.items
      .filter((x) => x.selected === true)
      .forEach((y) => (y.selected = false));

    this.change();
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
      this.items
        .filter((x) => x[this.objectId] !== item[this.objectId])
        .forEach((x) => (x.selected = false));
      this.currentValue = item;
      this.toggleShow();
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

  filterItems() {
    this.filteredItems = this.util.searchFilter(
      this.items,
      [this.displayValue],
      this.filterValue
    );
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
