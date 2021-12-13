import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { PeriodMock } from 'src/app/shared/mocks/period.mock';
import { PeriodsService } from 'src/app/shared/services/periods.service';

import { PeriodsComponent } from './periods.component';

fdescribe('PeriodsComponent', () => {
  let component: PeriodsComponent;
  let fixture: ComponentFixture<PeriodsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PeriodsComponent],
        providers: [PeriodsService],
        imports: [HttpClientTestingModule, TranslocoTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Create period', () => {
    it('should success', (done) => {
      const periods = TestBed.inject(PeriodsService);
      spyOn(periods, 'create').and.returnValue(of(PeriodMock.sample));
      spyOn(periods, 'getAll');
      component.create(PeriodMock.sample);
      expect(periods.getAll).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const periods = TestBed.inject(PeriodsService);
      spyOn(periods, 'create').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(periods, 'getAll');
      component.create(PeriodMock.sample);
      expect(periods.getAll).not.toHaveBeenCalled();
      done();
    });
  });
  describe('Edit period', () => {
    it('should success', (done) => {
      const periods = TestBed.inject(PeriodsService);
      spyOn(periods, 'edit').and.returnValue(of({}));
      spyOn(periods, 'getAll');
      component.edit(PeriodMock.sample);
      expect(periods.getAll).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const periods = TestBed.inject(PeriodsService);
      spyOn(periods, 'edit').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(periods, 'getAll');
      component.edit(PeriodMock.sample);
      expect(periods.getAll).not.toHaveBeenCalled();
      done();
    });
  });
  describe('Delete period', () => {
    it('should success', (done) => {
      const periods = TestBed.inject(PeriodsService);
      spyOn(periods, 'delete').and.returnValue(of({}));
      spyOn(periods, 'getAll');
      component.delete('');
      expect(periods.getAll).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const periods = TestBed.inject(PeriodsService);
      spyOn(periods, 'delete').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(periods, 'getAll');
      component.delete('');
      expect(periods.getAll).not.toHaveBeenCalled();
      done();
    });
  });
});
