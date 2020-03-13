import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { QuizesFormComponent } from '../quizes-form/quizes-form.component';
import { EditQuizComponent } from './edit-quiz.component';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { QuizPreviewComponent } from '../quiz-preview/quiz-preview.component';

describe('EditQuizComponent', () => {
  let component: EditQuizComponent;
  let fixture: ComponentFixture<EditQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [EditQuizComponent, QuizesFormComponent, QuestionFormComponent, QuizPreviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
