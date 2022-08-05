import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGroupsListsComponent } from './class-groups-lists.component';

describe('ClassGroupsListsComponent', () => {
  let component: ClassGroupsListsComponent;
  let fixture: ComponentFixture<ClassGroupsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClassGroupsListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGroupsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
