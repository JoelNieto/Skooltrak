import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGroupsListComponent } from './class-groups-list.component';

describe('ClassGroupsListComponent', () => {
  let component: ClassGroupsListComponent;
  let fixture: ComponentFixture<ClassGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClassGroupsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
