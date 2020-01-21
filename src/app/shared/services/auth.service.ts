import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { auth } from 'firebase';
import Swal from 'sweetalert2';

import { User } from '../models/users.model';
import { SessionService } from './session.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: firebase.User;
  user: User;
  constructor(
    private userServ: UsersService,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private translate: TranslateService,
    public router: Router,
    public ngZone: NgZone,
    public session: SessionService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async signIn(email: string, password: string) {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.ngZone.run(() => {
        this.userServ.getByProvider(res.user.uid).subscribe(
          user => {
            this.session.currentUser = user;
            this.setUserData(res.user);
            this.router.navigate(['Admin']);
          },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.router.navigate(['sign-up'], {
                state: { user: JSON.stringify(res.user) }
              });
            } else {
              Swal.fire(
                this.translate.instant('Something went wrong'),
                this.translate.instant(err.message),
                'error'
              );
            }
          }
        );
      });
    } catch (err) {
      Swal.fire(
        this.translate.instant('Something went wrong'),
        this.translate.instant(err.message),
        'error'
      );
    }
  }

  async providerLogin(provider: any) {
    try {
      const res = await this.afAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.userServ.getByProvider(res.user.uid).subscribe(
          user => {
            this.session.currentUser = user;
            this.setUserData(res.user);
            this.router.navigate(['Admin']);
          },
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.setUserData(res.user);
              this.router.navigate(['sign-up'], {
                state: { user: JSON.stringify(res.user) }
              });
            }
          }
        );
      });
    } catch (err) {
      Swal.fire(
        this.translate.instant('Something went wrong'),
        this.translate.instant(err.message),
        'error'
      );
    }
  }

  async signUp(email: string, password: string) {
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendVerificationMail();
      this.setUserData(res.user);
    } catch (err) {
      Swal.fire(
        this.translate.instant('Something went wrong'),
        this.translate.instant(err.message),
        'error'
      );
    }
  }

  async sendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  async forgotPassword(email: string) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      Swal.fire(
        this.translate.instant('Password reseted'),
        this.translate.instant('Password reset email sent, check your inbox.'),
        'info'
      );
    } catch (err) {
      Swal.fire(
        this.translate.instant('Something went wrong'),
        this.translate.instant(err.message),
        'error'
      );
    }
  }

  get isLoggenId(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && !user.emailVerified;
  }

  googleAuth() {
    return this.providerLogin(new auth.GoogleAuthProvider());
  }

  facebookAuth() {
    return this.providerLogin(new auth.FacebookAuthProvider());
  }

  twitterAuth() {
    return this.providerLogin(new auth.TwitterAuthProvider());
  }

  setUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }
}
