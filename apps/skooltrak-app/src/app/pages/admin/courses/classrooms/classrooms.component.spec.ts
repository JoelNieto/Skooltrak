import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ClassroomsMock } from 'src/app/shared/mocks/classrooms.mock';
import { ClassroomsService } from 'src/app/shared/services/classroom.service';

import { ClassroomsComponent } from './classrooms.component';

fdescribe('ClassroomsComponent', () => {
  let component: ClassroomsComponent;
  let fixture: ComponentFixture<ClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClassroomsService],
      declarations: [ClassroomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Create room', () => {
    it('should success', (done) => {
      const classrooms = TestBed.inject(ClassroomsService);
      spyOn(classrooms, 'create').and.returnValue(of(ClassroomsMock.sample));
      spyOn(classrooms, 'getAll');
      component.createRoom(ClassroomsMock.sample);
      expect(classrooms.getAll).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const classrooms = TestBed.inject(ClassroomsService);
      spyOn(classrooms, 'create').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(classrooms, 'getAll');
      component.createRoom(ClassroomsMock.sample);
      expect(classrooms.getAll).not.toHaveBeenCalled();
      done();
    });
  });

  describe('Edit room', () => {
    it('should success', (done) => {
      const classrooms = TestBed.inject(ClassroomsService);
      spyOn(classrooms, 'edit').and.returnValue(of({}));
      spyOn(classrooms, 'getAll');
      component.editRoom(ClassroomsMock.sample);
      expect(classrooms.getAll).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const classrooms = TestBed.inject(ClassroomsService);
      spyOn(classrooms, 'edit').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(classrooms, 'getAll');
      component.editRoom(ClassroomsMock.sample);
      expect(classrooms.getAll).not.toHaveBeenCalled();
      done();
    });
  });
  describe('Delete room', () => {
    it('should success', (done) => {
      const classrooms = TestBed.inject(ClassroomsService);
      spyOn(classrooms, 'delete').and.returnValue(of({}));
      spyOn(classrooms, 'getAll');
      component.deleteRoom(ClassroomsMock.sample.id);
      expect(classrooms.getAll).toHaveBeenCalled();
      done();
    });
    it('should fail', (done) => {
      const classrooms = TestBed.inject(ClassroomsService);
      spyOn(classrooms, 'delete').and.returnValue(
        throwError(() => new Error('message'))
      );
      spyOn(classrooms, 'getAll');
      component.deleteRoom(ClassroomsMock.sample.id);
      expect(classrooms.getAll).not.toHaveBeenCalled();
      done();
    });
  });
});
