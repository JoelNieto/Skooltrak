import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from '@skooltrak-app/ui';

@Component({
  selector: 'skooltrak-admin',
  standalone: true,
  imports: [CommonModule, DashboardComponent, TranslateModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
