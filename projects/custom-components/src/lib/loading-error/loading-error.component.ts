import { NgIfContext } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { AsyncWrapper } from '../async-wrapper';

@Component({
  selector: 'sk-loading-error',
  templateUrl: './loading-error.component.html',
  styleUrls: ['./loading-error.component.sass'],
})
export class LoadingErrorComponent {
  @ViewChild('template') template: TemplateRef<NgIfContext> | null = null;
  @Input() asyncWrapper: AsyncWrapper<any> | null = null;
  @Input() errorMessage: 'Something went wrong';
}
