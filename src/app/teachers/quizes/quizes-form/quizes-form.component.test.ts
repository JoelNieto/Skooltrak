import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { QuizesFormComponent } from './quizes-form.component';
import { QuestionFormComponent } from '../question-form/question-form.component';

describe('QuizesFormComponent', () => {
  let component: QuizesFormComponent;
  let fixture: ComponentFixture<QuizesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
      ],
      declarations: [ QuizesFormComponent, QuestionFormComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
