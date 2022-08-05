import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { CleaningItem } from 'src/app/shared/models/cleaning.model';

import { CleaningModalComponent } from './cleaning-modal.component';

fdescribe('CleaningModalComponent', () => {
  let component: CleaningModalComponent;
  let fixture: ComponentFixture<CleaningModalComponent>;
  const items: CleaningItem[] = [{ code: 'id', description: '', value: 0 }];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleaningModalComponent],
      imports: [TranslocoTestingModule],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should push to selection', () => {
    component.selection = items;
    component.toggleSelection(items[0]);
    expect(component.selection).toEqual([]);
  });

  it('should unselect', () => {
    component.selection = [];
    component.toggleSelection(items[0]);
    expect(component.selection).toEqual(items);
  });

  it('should get is selected', () => {
    component.selection = items;
    expect(component.isSelected('id')).toBeTruthy();
  });
});
