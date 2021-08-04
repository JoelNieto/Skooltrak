import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesGroupComponent } from './grades-group.component';

describe('GradesGroupComponent', () => {
  let component: GradesGroupComponent;
  let fixture: ComponentFixture<GradesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
