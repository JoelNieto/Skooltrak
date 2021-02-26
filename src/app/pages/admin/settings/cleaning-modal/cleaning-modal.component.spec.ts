import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningModalComponent } from './cleaning-modal.component';

describe('CleaningModalComponent', () => {
  let component: CleaningModalComponent;
  let fixture: ComponentFixture<CleaningModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
