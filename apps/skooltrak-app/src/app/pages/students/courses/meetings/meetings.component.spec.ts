import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseMock } from 'src/app/shared/mocks/course.mock';
import { UserMock } from 'src/app/shared/mocks/user.mock';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';

import { MeetingsComponent } from './meetings.component';

declare let JitsiMeetExternalAPI: any;
fdescribe('MeetingsComponent', () => {
  let component: MeetingsComponent;
  let fixture: ComponentFixture<MeetingsComponent>;
  const signalRServiceMock = {
    hubConnection: {
      stop: () => Promise.resolve(),
    },
    messageConnection: {
      stop: () => Promise.resolve(),
    },
    startForumConnection: () => {},
    startMessageConnection: () => {},
  };

  const sessionMock: Partial<SessionService> = {
    currentUser: UserMock.sample,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingsComponent],
      providers: [
        { provide: SignalRService, useValue: signalRServiceMock },
        { provide: SessionService, useValue: sessionMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsComponent);
    component = fixture.componentInstance;
    component.course = CourseMock.sample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should destroyd component', () => {
    spyOn(signalRServiceMock, 'startForumConnection');
    spyOn(signalRServiceMock, 'startMessageConnection');
    component.ngOnDestroy();
    expect(signalRServiceMock.startForumConnection).toHaveBeenCalled();
    expect(signalRServiceMock.startMessageConnection).toHaveBeenCalled();
  });
});
