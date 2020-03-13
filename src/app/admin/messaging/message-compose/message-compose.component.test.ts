import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComposeComponent } from './message-compose.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MessageComposeComponent', () => {
  let component: MessageComposeComponent;
  let fixture: ComponentFixture<MessageComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgxSummernoteModule, HttpClientTestingModule ],
      declarations: [ MessageComposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
