import { Injectable } from '@angular/core';
import { range } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DataUtilService {
  removeById(array: Array<any>, id: string): Array<any> {
    return array.filter((item) => item.id !== id);
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

  updateItem(item: any, array: any[]): any[] {
    const objIndex = array.findIndex((obj) => obj._id === item._id);
    array[objIndex] = item;
    return array;
  }

  paginate(itemsCount: number, currentPage: number = 1, pageSize: number): any {
    const totalPages: number = Math.ceil(itemsCount / pageSize) + 1;
    let startPage: number;
    let endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 6;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 3;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + (pageSize - 1), itemsCount - 1);

    const pages = range(startPage, endPage);

    return {
      totalItems: itemsCount,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  filterById(array: Array<any>, id: string, property: string = 'id'): any {
    return array.find((item) => item[property] === id);
  }

  isNullString(str?: string): string {
    return str || '';
  }

  getProperty(item: any, property: string): string {
    property?.split('.').forEach((e) => {
      item = item ? item[e] : '';
    });
    return item;
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
}
