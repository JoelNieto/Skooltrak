import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { schools } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-schools',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '<router-outlet></router-outlet>',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsComponent implements OnInit {
  constructor(private store: schools.SchoolsFacade) {}

  ngOnInit(): void {
    this.store.init();
  }
}
