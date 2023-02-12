import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { schools } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-schools',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '<router-outlet />',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolsComponent implements OnInit {
  private store = inject(schools.SchoolsFacade);

  ngOnInit(): void {
    this.store.init();
  }
}
