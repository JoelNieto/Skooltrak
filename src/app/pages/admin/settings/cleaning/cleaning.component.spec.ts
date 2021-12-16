import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { CleaningService } from 'src/app/shared/services/cleaning.service';
import { result } from 'underscore';

import { CleaningComponent } from './cleaning.component';

fdescribe('CleaningComponent', () => {
  let component: CleaningComponent;
  let fixture: ComponentFixture<CleaningComponent>;
  const modalMock = {
    open: () => ({
      result: Promise.resolve([{ code: '', description: '', number: 0 }]),
      componentInstance: {},
    }),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: NgbModal, useValue: modalMock }, CleaningService],
      declarations: [CleaningComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should selectItem', (done) => {
    const service = TestBed.inject(CleaningService);
    const modal = TestBed.inject(NgbModal);
    spyOn(service, 'runCleaning').and.returnValue(of({}));
    spyOn(modal, 'open').and.callThrough();
    component.selectItems();
    done();
    expect(modalMock.open).toHaveBeenCalled();
  });
  it('should selectItem fail', (done) => {
    const service = TestBed.inject(CleaningService);
    const modal = TestBed.inject(NgbModal);
    spyOn(service, 'runCleaning').and.returnValue(
      throwError(() => new Error(''))
    );
    spyOn(modal, 'open').and.callThrough();
    component.selectItems();
    done();
    expect(modalMock.open).toHaveBeenCalled();
  });
});
