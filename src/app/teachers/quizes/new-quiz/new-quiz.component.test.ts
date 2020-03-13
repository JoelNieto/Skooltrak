import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QuizesFormComponent } from '../quizes-form/quizes-form.component';
import { NewQuizComponent } from './new-quiz.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { QuizPreviewComponent } from '../quiz-preview/quiz-preview.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewQuizComponent', () => {
  let component: NewQuizComponent;
  let fixture: ComponentFixture<NewQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule,
        HttpClientTestingModule,
        NgbModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [NewQuizComponent, QuizesFormComponent, QuestionFormComponent, QuizPreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
