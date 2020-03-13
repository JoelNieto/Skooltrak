import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsComponent } from './forums.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForumsComponent', () => {
  let component: ForumsComponent;
  let fixture: ComponentFixture<ForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TranslocoTestingModule, SharedModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ForumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
