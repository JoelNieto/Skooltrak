import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserMock } from 'src/app/shared/mocks/user.mock';
import { SessionService } from 'src/app/shared/services/session.service';

import { ClassroomPageComponent } from './classroom-page.component';

fdescribe('ClassroomPageComponent', () => {
  let component: ClassroomPageComponent;
  let fixture: ComponentFixture<ClassroomPageComponent>;

  const sessionMock: Partial<SessionService> = {
    currentUser: UserMock.sample,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: SessionService, useValue: sessionMock }],
      declarations: [ClassroomPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
