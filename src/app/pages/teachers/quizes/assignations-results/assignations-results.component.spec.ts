import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignationsResultsComponent } from './assignations-results.component';

describe('AssignationsResultsComponent', () => {
  let component: AssignationsResultsComponent;
  let fixture: ComponentFixture<AssignationsResultsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AssignationsResultsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
