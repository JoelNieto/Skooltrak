/* import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { SignInComponent } from './sign-in.component';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (d: any) => new Promise((resolve, reject) => resolve())
    })
  })
};

fdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireAuth, useValue: FirestoreStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */
