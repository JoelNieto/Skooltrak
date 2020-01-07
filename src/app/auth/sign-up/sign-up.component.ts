import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  public credential: firebase.User;
  public userForm: FormGroup;
  environment: any;

  constructor(
    public auth: AuthService,
    private usersServ: UsersService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (window.history.state.user) {
      this.credential = JSON.parse(window.history.state.user);
    }
    console.log(this.credential);
    this.initalizeForm();
  }

  initalizeForm() {
    this.userForm = this.fb.group({
      displayName: [
        this.credential ? this.credential.displayName : '',
        [Validators.required]
      ],
      email: [
        this.credential ? this.credential.email : '',
        [Validators.required]
      ],
      photoURL: [this.credential ? this.credential.photoURL : '', []]
    });

    if (!this.credential) {
      this.userForm.addControl(
        'password',
        this.fb.control('', [Validators.required, Validators.minLength(6)])
      );
      this.userForm.addControl(
        'passwordConfirm',
        this.fb.control('', [Validators.required, Validators.minLength(6)])
      );
    }
  }

  async saveUser() {
    const user: User = this.userForm.value;
    user.authProviders = [];
    if (this.credential) {
      user.authProviders.push({
        uid: this.credential.uid,
        email: this.credential.email,
        emailVerified: this.credential.emailVerified,
        photoURL: this.credential.photoURL,
        providerId: this.credential.providerData[0].providerId
      });
    } else {
      const loginProvider = await this.afAuth.auth.createUserWithEmailAndPassword(
        this.userForm.controls.email.value,
        this.userForm.controls.password.value
      );
      user.authProviders.push({
        uid: loginProvider.user.uid,
        providerId: 'email',
        email: loginProvider.user.email
      });
    }
    this.usersServ.create(user).subscribe(res => {
      Swal.fire('Usuario registrado exitosamente', 'Bienvenido', 'success');
      this.router.navigate(['Admin']);
    });
  }

  passwordConfirm(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
      ? null
      : { mismatch: true };
  }
}