import { DatePipe } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

import { CustomFormComponent } from '../custom-form/custom-form.component';
import { UtilService } from '../util.service';
import * as pdf from './pdf';
import { Column, TableOptions } from './table-options';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'sk-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.sass']
})
export class CustomTableComponent
  implements OnInit, OnChanges, DoCheck, AfterViewChecked {
  @Input() options: TableOptions;
  @Input() items: any[];
  @Input() selectedItems = [];
  @Output() editItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() addItem = new EventEmitter();
  @Output() updateSelection = new EventEmitter();
  sorting = false;
  allSelected: boolean;
  newItem: any = {};
  selectedItem: any = {};
  sortColumn: string;
  sortDesc = true;
  itemsCount: number;
  originalCount: number;
  pagedItems: Array<any> = [];
  currentPage: any = {};
  searchText = '';
  filteredItems: Array<any>;
  searchColumns: Array<string> = [];
  pageSizes: Array<number> = [5, 10, 15, 20, 25];
  idColumn: Column = {
    name: 'id'
  };
  filterValues: Array<string> = [];
  visibleColumns: number;
  booleanValues: any = [
    { value: true, display: 'Sí' },
    { value: false, display: 'No' }
  ];
  constructor(
    private util: UtilService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  ngOnChanges(model: SimpleChanges) {
    if (model.items) {
      if (this.items) {
        this.initTable();
        if (this.options.sortColumn) {
          this.filteredItems = this.util.sortBy(
            this.items,
            this.options.sortColumn,
            this.options.sortDesc
          );
        } else {
          this.filteredItems = this.items;
        }
        // this.filterItems();
      }
    }
  }

  initTable() {
    if (this.options.type === 'select') {
      this.setSelectedItems();
    }
    this.visibleColumns = 0; // inicializa el número de columnas visibles
    this.options.columns.forEach(column => {
      if (column.type === 'object') {
        column.objectText = `text${column.name}`;
        this.items.forEach(element => {
          this.getObjectText(element, column);
        });
      }
      if (column.filterable) {
        this.searchColumns.push(column.name);
      }
      if (this.options.showID) {
        this.options.columns.push(this.idColumn);
      }
      if (this.options.lookup) {
        column.lookupValues = this.getLookup(column);
      }

      if (!column.hidden) {
        this.visibleColumns++;
      }
    });
  }

  setSelectedItems() {
    if (this.selectedItems) {
      this.items.forEach(item => {
        if (this.util.filterById(this.selectedItems, item.id)) {
          item.selected = true;
          if (!this.util.filterById(this.selectedItems, item.id)) {
            this.selectedItems.push(item);
          }
        } else {
          item.selected = false;
        }
      });
    } else {
      this.selectedItems = [];
    }
  }

  toggleSelection(item: any) {
    item.selected = !item.selected;
    if (item.selected) {
      if (this.options.type === 'single-select') {
        this.selectedItems = [];
        this.cleanSelected(item.id);
      }
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.util.removeById(this.selectedItems, item.id);
    }
    this.pageItems();
    this.updateSelection.emit(this.selectedItems);
  }

  cleanSelected(id: string) {
    this.filteredItems.forEach(item => {
      if (item.id !== id) {
        item.selected = false;
      }
    });
  }

  toggleSelectAll(isToogle?: boolean) {
    if (isToogle) {
      this.selectedItems = [];
      this.allSelected = !this.allSelected;
    }

    if (this.allSelected) {
      this.filteredItems.forEach(item => {
        item.selected = true;
        this.selectedItems.push(item);
      });
    } else {
      this.filteredItems.forEach(item => {
        item.selected = false;
      });
    }
    this.updateSelection.emit(this.selectedItems);
  }

  openModal(isNew = true) {
    const modalRef = this.modalService.open(CustomFormComponent, {
      size: this.options.modalSize
    });
    modalRef.result.then(
      result => {
        if (!isNew) {
          this.updateItem();
        } else {
          this.createItem();
        }
      },
      dismiss => {
        this.cancelSelect();
      }
    );
    modalRef.componentInstance.fields = this.options.columns;
    if (!isNew) {
      modalRef.componentInstance.item = this.selectedItem;
    } else {
      modalRef.componentInstance.item = this.newItem;
    }
  }

  getObjectText(item: any, column: Column) {
    if (!column.objectColumn) {
      column.objectColumn = `${column.name}.name`;
    }
    item[`text${column.name}`] = this.util.getProperty(
      item,
      column.objectColumn
    );
  }

  getLookup(col: Column): Array<any> {
    const values: Array<any> = [];
    if (col.type === 'object') {
      this.items.forEach(element => {
        if (
          !values.includes(this.util.getProperty(element, col.objectColumn)) &&
          this.util.getProperty(element, col.objectColumn)
        ) {
          values.push(this.util.getProperty(element, col.objectColumn));
        }
      });
    } else {
      this.items.forEach(element => {
        if (!values.includes(element[col.name])) {
          values.push(element[col.name]);
        }
      });
    }
    values.sort();
    return values;
  }

  ngDoCheck() {
    if (this.items) {
      if (!this.options.pageable) {
        this.filteredItems = this.items;
        this.pagedItems = this.filteredItems;
        this.initTable();
      } else if (!this.filteredItems) {
        this.filteredItems = this.items;
        this.filterItems();
      } else {
        if (this.originalCount !== this.items.length) {
          this.initTable();
          this.filteredItems = this.items;
          this.itemsCount = this.filteredItems.length;
          this.originalCount = this.items.length;
        }
      }
    }
  }

  selectItem(item: any) {
    if (this.options.type === 'datatable' && this.editItem.observers.length) {
      if (this.options.hasId) {
        this.selectedItem = Object.assign({}, this.selectedItem, item);
      } else {
        this.selectItem = item;
      }

      if (this.options.addMethod === 'modal') {
        this.openModal(false);
      }
    }
  }

  generatePDF() {
    pdf.generatePDF(
      this.options.columns,
      this.itemsToReports(true),
      this.options.title
    );
  }

  changeFilter() {
    this.filterItems();
    for (const key in this.filterValues) {
      if (this.filterValues.hasOwnProperty(key)) {
        let col: Column;
        col = this.options.columns.find(item => item.name === key);
        const element = this.filterValues[key];
        if (element) {
          if (col.type === 'object') {
            this.filteredItems = this.filteredItems.filter(
              item => this.util.getProperty(item, col.objectColumn) === element
            );
          } else {
            this.filteredItems = this.filteredItems.filter(
              item => item[key] === element
            );
          }
        }
        this.itemsCount = this.filteredItems.length;
      }
    }
    this.sortColumn = '';
    this.pageItems();
  }

  cancelSelect() {
    this.selectedItem = {};
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  sortByColumn(column: Column) {
    this.sorting = true;
    if (column.name === this.sortColumn) {
      this.sortDesc = !this.sortDesc;
    }

    if (column.type === 'object') {
      this.filteredItems = this.util.sortBy(
        this.filteredItems,
        column.objectText,
        this.sortDesc
      );
    } else {
      this.filteredItems = this.util.sortBy(
        this.filteredItems,
        column.name,
        this.sortDesc
      );
    }

    this.sortColumn = column.name;

    this.pageItems();
  }

  getDetailsURL(id: string): string {
    const URL = this.options.detailsURL.slice();
    URL.push(id);
    return URL.join('/');
  }

  setPage(pager: any) {
    this.currentPage.startIndex = pager.startIndex;
    this.currentPage.endIndex = pager.endIndex;
    if (this.options.pageable) {
      this.pageItems();
    } else {
      this.pagedItems = this.filteredItems;
    }
  }

  pageItems() {
    this.pagedItems = this.filteredItems.slice(
      this.currentPage.startIndex,
      this.currentPage.endIndex + 1
    );
  }

  filterItems() {
    this.sorting = false;
    this.filteredItems = this.util.searchFilter(
      this.items,
      this.searchColumns,
      this.searchText
    );
    if (this.options.pageable) {
      this.itemsCount = this.filteredItems.length;
      this.pageItems();
    } else {
      this.pagedItems = this.filteredItems;
    }
    this.toggleSelectAll();
  }

  createItem() {
    this.addItem.emit(this.newItem);
    this.newItem = {};
  }

  attachNewItem(item: any) {
    this.options.columns.forEach(column => {
      if (column.type === 'object') {
        item[column.name] = this.util.filterById(
          column.list,
          item[column.objectID]
        );
        this.getObjectText(item, column);
      }
    });
    this.items.push(item);
  }

  updateItem() {
    if (this.options.hasId) {
      this.pagedItems = this.util.updateItem(
        this.selectedItem,
        this.pagedItems
      );
      this.items = this.util.updateItem(this.selectedItem, this.items);
      this.filteredItems = this.util.updateItem(
        this.selectedItem,
        this.filteredItems
      );
    }

    // item = this.selectedItem;
    this.editItem.emit(this.selectedItem);
    this.selectedItem = {};
  }

  deleteItem(item: any) {
    Swal.fire({
      title: this.translate.instant('Wanna delete item?'),
      text: this.translate.instant('This cant be undone'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3182ce',
      cancelButtonColor: '#718096',
      cancelButtonText: this.translate.instant('Cancel'),
      confirmButtonText: this.translate.instant('Confirm delete')
    }).then(result => {
      if (result.value) {
        if (this.options.hasId) {
          this.items = this.util.removeById(this.items, item.id);
          this.removeItem.emit(item.id);
        } else {
          this.items = this.items.filter(x => x !== item);
          this.removeItem.emit(item);
        }
        this.filterItems();
      }
    });
  }

  exportCSV() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.itemsToReports());
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let filename: string;
    const date = new Date();

    if (this.options.title) {
      filename = `${this.options.title} - ${date.toLocaleString()}.xlsx`;
    } else {
      filename = `Export - ${date.toLocaleString()}.xlsx`;
    }

    const wbout: string = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)]), filename);
  }

  s2ab(s: string): ArrayBuffer {
    const buf: ArrayBuffer = new ArrayBuffer(s.length);
    const view: Uint8Array = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      // tslint:disable-next-line:no-bitwise
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  itemsToReports(visible?: boolean): any[] {
    const items = [];
    this.filteredItems.forEach(item => {
      const object = {};
      this.options.columns.forEach(column => {
        if (!column.hidden || !visible) {
          if (column.type === 'object') {
            object[column.title] = this.util.getProperty(
              item,
              column.objectColumn
            );
          } else if (column.type === 'date') {
            object[column.title] = this.datePipe.transform(
              this.util.getProperty(item, column.name),
              'dd/MM/yyyy'
            );
          } else {
            object[column.title] = this.util.getProperty(item, column.name);
          }
        }
      });
      items.push(object);
    });
    return items;
  }
}
