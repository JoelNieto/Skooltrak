import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AssignmentTypesComponent } from '../assignment-types/assignment-types.component';
import { DegreesComponent } from '../degrees/degrees.component';

@Component({
  selector: 'skooltrak-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    AssignmentTypesComponent,
    DegreesComponent,
    MatCardModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  constructor() {}
}
