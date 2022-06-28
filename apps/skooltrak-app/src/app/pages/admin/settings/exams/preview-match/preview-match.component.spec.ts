import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMatchComponent } from './preview-match.component';

describe('PreviewMatchComponent', () => {
  let component: PreviewMatchComponent;
  let fixture: ComponentFixture<PreviewMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
