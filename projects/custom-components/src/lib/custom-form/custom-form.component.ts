import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Column } from '../custom-table/table-options';
import { UtilService } from '../util.service';

@Component({
  selector: 'sk-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.sass']
})
export class CustomFormComponent implements OnInit {
  @Input() fields: Column[];
  @Input() item?: any = {};

  constructor(public activeModal: NgbActiveModal, private util: UtilService) {}

  ngOnInit() {
    this.resolveLists();
  }

  updateObject(event) {
    this.fields.forEach(field => {
      if (field.type === 'object' && this.item[field.objectID]) {
        this.item[field.name] = this.util.filterById(
          field.list,
          this.item[field.objectID]
        );
        this.item[field.objectText] = this.item[field.name][field.listDisplay];
      }
    });
  }

  setFile(file: any, field: Column) {
    this.item[field.name] = file.target.files;
  }

  resolveLists(): void {
    this.fields.forEach(field => {
      if (field.asyncList) {
        field.asyncList.subscribe(data => {
          field.list = field.listDisplay
            ? this.util.sortBy(data, field.listDisplay)
            : this.util.sortBy(data, 'name');
        });
      }
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
