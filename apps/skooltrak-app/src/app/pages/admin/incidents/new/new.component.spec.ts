import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { IncidentsMock } from 'src/app/shared/mocks/incidents.mock';
import { IncidentsService } from 'src/app/shared/services/incidents.service';

import { NewComponent } from './new.component';

fdescribe('NewComponent', () => {
  let component: NewComponent;
  let fixture: ComponentFixture<NewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslocoTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [NewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('create report', () => {
    it('should success', (done) => {
      const incidents = TestBed.inject(IncidentsService);
      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      spyOn(incidents, 'create').and.returnValue(of(IncidentsMock.sample));
      component.createReport(IncidentsMock.sample);
      expect(router.navigate).toHaveBeenCalled;
      done();
    });
    it('should fail', (done) => {
      const incidents = TestBed.inject(IncidentsService);
      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      spyOn(incidents, 'create').and.returnValue(
        throwError(() => new Error('Failed'))
      );
      component.createReport(IncidentsMock.sample);
      expect(router.navigate).not.toHaveBeenCalled;
      done();
    });
  });
});
