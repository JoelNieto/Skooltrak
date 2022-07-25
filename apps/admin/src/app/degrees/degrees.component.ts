import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { degrees as state } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-degrees',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DegreesComponent implements OnInit {
  constructor(private readonly store: state.DegreesFacade) {}

  ngOnInit(): void {
    this.store.init();
  }
}
