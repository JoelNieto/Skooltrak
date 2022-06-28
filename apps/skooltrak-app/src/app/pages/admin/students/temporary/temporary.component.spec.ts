import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { StudentsMock } from 'src/app/shared/mocks/student.mock';
import { StudentsService } from 'src/app/shared/services/students.service';

import { TemporaryComponent } from './temporary.component';

fdescribe('TemporaryComponent', () => {
  let component: TemporaryComponent;
  let fixture: ComponentFixture<TemporaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, TranslocoTestingModule],
        providers: [StudentsService],
        declarations: [TemporaryComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Create period', () => {
    it('should success', (done) => {
      const students = TestBed.inject(StudentsService);
      spyOn(students, 'create').and.returnValue(of(StudentsMock.sample));
      spyOn(students, 'getTemporary');
      component.createStudent(StudentsMock.sample);
      expect(students.getTemporary).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const students = TestBed.inject(StudentsService);
      spyOn(students, 'create').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(students, 'getTemporary');
      component.createStudent(StudentsMock.sample);
      expect(students.getTemporary).not.toHaveBeenCalled();
      done();
    });
  });
  describe('Edit period', () => {
    it('should success', (done) => {
      const students = TestBed.inject(StudentsService);
      spyOn(students, 'edit').and.returnValue(of({}));
      spyOn(students, 'getTemporary');
      component.updateStudent(StudentsMock.sample);
      expect(students.getTemporary).not.toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const students = TestBed.inject(StudentsService);
      spyOn(students, 'edit').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(students, 'getTemporary');
      component.updateStudent(StudentsMock.sample);
      expect(students.getTemporary).not.toHaveBeenCalled();
      done();
    });
  });
  describe('Delete period', () => {
    it('should success', (done) => {
      const students = TestBed.inject(StudentsService);
      spyOn(students, 'delete').and.returnValue(of({}));
      spyOn(students, 'getTemporary');
      component.deleteStudent('');
      expect(students.getTemporary).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const students = TestBed.inject(StudentsService);
      spyOn(students, 'delete').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(students, 'getTemporary');
      component.deleteStudent('');
      expect(students.getTemporary).not.toHaveBeenCalled();
      done();
    });
  });
});
