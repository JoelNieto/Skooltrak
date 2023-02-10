import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroupsStore } from './class-groups.store';

@Component({
  selector: 'skooltrak-class-groups',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet/>
  `,
  styles: [],
  providers: [ClassGroupsService, provideComponentStore(ClassGroupsStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassGroupsComponent {}
