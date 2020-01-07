import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}
  removeById(array: Array<any>, id: string): Array<any> {
    return array.filter(item => item.id !== id);
  }

  filterById(array: Array<any>, id: string): any {
    return array.find(item => item.id === id);
  }

  updateItem(item: any, array: any[]): any[] {
    const objIndex = array.findIndex(obj => obj.ID === item.ID);
    array[objIndex] = item;
    return array;
  }

  isNullString(str?: string): string {
    return str || '';
  }

  searchFilter(
    array: Array<any>,
    args: Array<string>,
    searchText: string
  ): Array<any> {
    const filterArray: Array<any> = [];

    searchText = searchText.toLocaleLowerCase();

    for (const item of array) {
      let term = '';
      for (const col of args) {
        term = term + this.isNullString(this.getProperty(item, col));
      }
      term = term.toLocaleLowerCase();
      if (term.indexOf(searchText) >= 0) {
        filterArray.push(item);
      }
    }
    return filterArray;
  }

  sortBy(array: Array<any>, args: string, desc?: boolean): Array<any> {
    if (desc) {
      array.sort((a: any, b: any) => {
        if (!a[args]) {
          return 1;
        } else if (!b[args]) {
          return -1;
        } else if (a[args] < b[args]) {
          return 1;
        } else if (a[args] > b[args]) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      array.sort((a: any, b: any) => {
        if (!a[args]) {
          return -1;
        } else if (!b[args]) {
          return 1;
        } else if (a[args] < b[args]) {
          return -1;
        } else if (a[args] > b[args]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }

  paginate(itemsCount: number, currentPage: number = 1, pageSize: number = 10) {
    const totalPages: number = Math.ceil(itemsCount / pageSize) + 1;
    let startPage: number;
    let endPage: number;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, itemsCount - 1);

    const pages = _.range(startPage, endPage);

    return {
      totalItems: itemsCount,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  getProperty(item: any, property: string): any {
    property.split('.').forEach(e => {
      item = item ? item[e] : '';
    });
    return item;
  }
}
