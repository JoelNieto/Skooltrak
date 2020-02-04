import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CustomComponentsModule } from '@skooltrak/custom-components';

import { QuizesComponent } from './quizes.component';

describe('QuizesComponent', () => {
  let component: QuizesComponent;
  let fixture: ComponentFixture<QuizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomComponentsModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [QuizesComponent],
      providers: [DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
