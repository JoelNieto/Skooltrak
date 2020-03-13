import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceFormComponent } from './attendance-form.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/shared/services/session.service';
import { SessionMock } from 'src/app/shared/mocks/session.mock';

describe('AttendanceFormComponent', () => {
  let component: AttendanceFormComponent;
  let fixture: ComponentFixture<AttendanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoTestingModule, FormsModule, HttpClientTestingModule, NgbModalModule ],
      declarations: [ AttendanceFormComponent ],
      providers: [ NgbActiveModal, { provide: SessionService, useClass: SessionMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

