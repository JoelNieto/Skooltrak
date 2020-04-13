import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationsComponent } from './assignations.component';

describe('AssignationsComponent', () => {
  let component: AssignationsComponent;
  let fixture: ComponentFixture<AssignationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
