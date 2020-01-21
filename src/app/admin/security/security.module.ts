import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AccessComponent } from './access/access.component';
import { RolesComponent } from './roles/roles.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [SecurityComponent, RolesComponent, AccessComponent],
  imports: [CommonModule, SecurityRoutingModule, TranslateModule.forChild()]
})
export class SecurityModule {}
