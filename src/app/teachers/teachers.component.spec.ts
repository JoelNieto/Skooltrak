import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { SessionMock } from '../shared/mocks/session.mock';
import { SessionService } from '../shared/services/session.service';
import { TeachersComponent } from './teachers.component';

describe('TeachersComponent', () => {
  let component: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BreadcrumbModule,
        SidebarModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [TeachersComponent],
      providers: [{ provide: SessionService, useClass: SessionMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
