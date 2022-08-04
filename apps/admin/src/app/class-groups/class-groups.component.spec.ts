import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGroupsComponent } from './class-groups.component';

describe('ClassGroupsComponent', () => {
  let component: ClassGroupsComponent;
  let fixture: ComponentFixture<ClassGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClassGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
