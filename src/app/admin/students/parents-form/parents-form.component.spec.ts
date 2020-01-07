import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsFormComponent } from './parents-form.component';

describe('ParentsFormComponent', () => {
  let component: ParentsFormComponent;
  let fixture: ComponentFixture<ParentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
