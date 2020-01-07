import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

import { UtilService } from '../util.service';

@Component({
  selector: 'sk-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() itemsCount: number;
  @Output() paginate = new EventEmitter();

  pager: any = {};
  private count: number;
  pageSize;
  sizes: number[];
  constructor(private util: UtilService) {}

  ngOnInit() {
    this.sizes = [5, 10, 15, 20];
    this.pageSize = 5;
    this.setPage(1);
  }

  ngOnChanges(changes: SimpleChanges) {
    const count: SimpleChange = changes.itemsCount;
    this.count = count.currentValue;
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // tslint:disable-next-line: radix
    this.pager = this.util.paginate(this.count, page, parseInt(this.pageSize));

    this.paginate.emit(this.pager);
  }
}
