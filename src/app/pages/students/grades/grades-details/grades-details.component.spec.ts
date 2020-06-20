import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesDetailsComponent } from './grades-details.component';

describe('GradesDetailsComponent', () => {
  let component: GradesDetailsComponent;
  let fixture: ComponentFixture<GradesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
