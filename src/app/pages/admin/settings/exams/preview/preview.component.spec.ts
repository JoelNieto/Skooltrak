import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamsMock } from 'src/app/shared/mocks/exams.mock';

import { PreviewComponent } from './preview.component';

fdescribe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    component.exam = ExamsMock.sample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
