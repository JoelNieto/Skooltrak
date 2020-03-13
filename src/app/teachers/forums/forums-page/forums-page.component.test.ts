import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumsPageComponent } from './forums-page.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { ChatComponent } from '../chat/chat.component';

describe('ForumsPageComponent', () => {
  let component: ForumsPageComponent;
  let fixture: ComponentFixture<ForumsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbNavModule, TranslocoTestingModule, CustomComponentsModule ],
      declarations: [ ForumsPageComponent, ChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
