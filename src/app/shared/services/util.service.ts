import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UtilService {
  constructor() { }

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
