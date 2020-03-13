/* import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursesMessagesComponent } from './courses-messages.component';
import { TranslateModule } from '@ngx-translate/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { SessionMock } from 'src/app/shared/mocks/session.mock';

describe('CoursesMessagesComponent', () => {
  let component: CoursesMessagesComponent;
  let fixture: ComponentFixture<CoursesMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [CoursesMessagesComponent],
      providers: [{ provide: SessionService, useClass: SessionMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */
