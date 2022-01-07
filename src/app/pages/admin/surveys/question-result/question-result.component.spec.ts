import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionResultComponent } from './question-result.component';

describe('QuestionResultComponent', () => {
  let component: QuestionResultComponent;
  let fixture: ComponentFixture<QuestionResultComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionResultComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
