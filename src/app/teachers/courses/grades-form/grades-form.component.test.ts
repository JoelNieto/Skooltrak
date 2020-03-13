import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { GradesFormComponent } from './grades-form.component';
import { CustomComponentsModule } from '@skooltrak/custom-components';
import { CourseMock } from 'src/app/shared/mocks/course.mock';

describe('GradesFormComponent', () => {
  let component: GradesFormComponent;
  let fixture: ComponentFixture<GradesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModalModule,
        NgbModule,
        CustomComponentsModule,
        HttpClientTestingModule,
        TranslocoTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [NgbActiveModal],
      declarations: [GradesFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesFormComponent);
    component = fixture.componentInstance;
    component.course = CourseMock.sample;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
