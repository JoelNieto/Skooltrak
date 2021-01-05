import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { AccessComponent } from './access/access.component';
import { RolesComponent } from './roles/roles.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [SecurityComponent, RolesComponent, AccessComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    NgbModalModule,
    TranslocoModule,
    CustomComponentsModule,
  ],
})
export class SecurityModule {}
