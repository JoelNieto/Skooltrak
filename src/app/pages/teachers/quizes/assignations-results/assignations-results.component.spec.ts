import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationsResultsComponent } from './assignations-results.component';

describe('AssignationsResultsComponent', () => {
  let component: AssignationsResultsComponent;
  let fixture: ComponentFixture<AssignationsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
