import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { BreadcrumbModule } from '../shared/components/breadcrumb/breadcrumb.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { SessionMock } from '../shared/mocks/session.mock';
import { SessionService } from '../shared/services/session.service';
import { StudentsComponent } from './students.component';

fdescribe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SidebarModule,
        BreadcrumbModule,
        RouterTestingModule,
        TranslocoTestingModule
      ],
      declarations: [StudentsComponent],
      providers: [{ provide: SessionService, useClass: SessionMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
