/* eslint-disable @typescript-eslint/ban-types */
import { Observable } from 'rxjs';

export interface TableOptions {
  columns: Column[];
  hasId: boolean;
  type: 'single-select' | 'datatable' | 'select';
  style?: string;
  title?: string;
  pageable: boolean;
  deletable?: boolean;
  creatable?: boolean;
  addMethod: 'inline' | 'modal';
  detailsURL?: String[];
  newURL?: String[];
  showID?: boolean;
  lookup?: boolean;
  exportToCSV?: boolean;
  exportToPDF?: boolean;
  reportsOnly?: boolean;
  showTitle?: boolean;
  sortColumn?: string;
  sortDesc?: boolean;
  pageSize: number;
  searchable: boolean;
  modalSize?: 'lg' | 'sm';
  accessCode: string;
  permissions: {
    read: boolean;
    details: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export class TableOptions {
  constructor(
    public type: 'datatable' | 'select' | 'single-select' = 'datatable',
    public permissions = {
      read: true,
      details: true,
      create: true,
      edit: true,
      delete: true,
    },
    public pageable = true,
    public addMethod: 'inline' | 'modal' = 'modal',
    public searchable = true,
    public hasId = true,
    public pageSize = 10
  ) {}
}

export interface Column {
  name?: string;
  title?: string;
  type?:
    | 'date'
    | 'datetime'
    | 'decimal'
    | 'email'
    | 'number'
    | 'percent'
    | 'money'
    | 'boolean'
    | 'mobile-phone'
    | 'home-phone'
    | 'checkbox'
    | 'object'
    | 'text'
    | 'file'
    | 'array'
    | 'count';
  sortable?: boolean;
  filterable?: boolean;
  pipe?: string;
  hidden?: boolean;
  style?: string;
  readonly?: boolean;
  list?: any[];
  // eslint-disable-next-line rxjs/finnish
  asyncList?: Observable<any[]>;
  listID?: any;
  listDisplay?: any;
  objectColumn?: string;
  objectID?: string;
  objectText?: string;
  lookup?: boolean;
  lookupValues?: any[];
  customClasses?: string;
  rateField?: boolean;
  fileURL?: string;
  fileID?: string;
  fileName?: string;
  required?: boolean;
  filterField?: string;
  filterColumn?: string;
  model?: Column[];
  removeSelf?: boolean;
}
