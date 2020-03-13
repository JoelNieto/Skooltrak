import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { SessionMock } from '../shared/mocks/session.mock';
import { SessionService } from '../shared/services/session.service';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        RouterTestingModule,
        BreadcrumbModule,
        SidebarModule,
        HttpClientTestingModule,
        TranslocoTestingModule
      ],
      providers: [{ provide: SessionService, useClass: SessionMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
