import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { DataUtilService } from '@skooltrak-app/utils';

import { ArrayPipe } from '../pipes/array/array.pipe';
import { ColumnPipe } from '../pipes/column/column.pipe';

@Component({
  selector: 'skooltrak-select',
  standalone: true,
  imports: [CommonModule, ArrayPipe, TranslocoModule, FormsModule, ColumnPipe],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  implements OnInit, ControlValueAccessor, OnChanges
{
  @Input() multiple = false;
  @Input() items!: any[] | null;
  @Input() search = true;
  @Input() displayValue!: string;
  @Input() secondaryDisplay!: string;
  @Input() placeholder = 'Insert value';
  @Input() objectId = 'id';
  showDropdown = false;
  currentValue: any | any[];
  arrayPipe = new ArrayPipe();
  filterValue!: string;
  inputDisplay!: string;
  filteredItems!: any[];
  calledInside = false;

  @HostListener('click')
  clickInside(): void {
    this.calledInside = true;
  }

  @HostListener('document: click')
  clickOutside() {
    if (!this.calledInside && this.showDropdown) {
      this.toggleShow();
      this.filterItems();
    }

    this.calledInside = false;
  }

  constructor(private util: DataUtilService) {}

  ngOnInit(): void {
    if (this.multiple) {
      this.currentValue = [];
    } else {
      this.currentValue = {};
    }
  }

  ngOnChanges(model: SimpleChanges): void {
    if (model['items']) {
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
          if (this.currentValue) {
            this.items
              .filter(
                (x) => x[this.objectId] === this.currentValue[this.objectId]
              )
              .map((x) => {
                x.selected = true;
                return x;
              });
          }
        }
        this.items = this.util.sortBy(this.items, this.displayValue);
      }
    }
  }

  toggleShow(): void {
    this.filterValue = '';
    this.showDropdown = !this.showDropdown;
  }

  get value(): any | any[] {
    return this.currentValue;
  }

  onChange = (value: any | any[]): void => {};

  change(): void {
    this.onChange(this.value);
  }

  valueDisplay(): string | null {
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

  clearAll(): void {
    if (this.multiple) {
      this.currentValue = [];
    } else {
      this.currentValue = null;
    }

    this.items!.filter((x) => x.selected === true).forEach(
      (y) => (y.selected = false)
    );

    this.change();
  }

  toggleItem(item: any): void {
    item.selected = !item.selected;
    if (this.multiple) {
      if (item.selected) {
        this.currentValue.push(item);
      } else {
        this.currentValue = this.util.removeById(this.currentValue, item.id);
      }
    } else {
      this.items!.filter(
        (x) => x[this.objectId] !== item[this.objectId]
      ).forEach((x) => (x.selected = false));
      this.currentValue = item;
      this.toggleShow();
    }

    this.change();
  }

  onTouched = (): void => {};

  writeValue(val: any | any[]): void {
    if (val) {
      this.currentValue = val;
      this.onChange(this.value);
      this.change();
    }
  }

  filterItems(): void {
    this.filteredItems = this.util.searchFilter(
      this.items!,
      [this.displayValue, this.secondaryDisplay],
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
