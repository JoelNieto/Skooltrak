import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { auth } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-sign-in',
  template: `
    <mat-progress-bar
      *ngIf="logging$ | async"
      mode="indeterminate"
    ></mat-progress-bar>
    <div class="row back justify-content-end">
      <div
        class="col-md-6 col-lg-4 form-container bg-white d-flex flex-column justify-content-center"
      >
        <form [formGroup]="form" (ngSubmit)="signIn()">
          <div class="d-flex align-items-center justify-content-center">
            <a [target]="'blank'"> </a>
          </div>
          <mat-form-field>
            <mat-label>{{ 'Email and password' | translate }}</mat-label>
            <input
              matInput
              type="string"
              name="username"
              id="username"
              formControlName="username"
              autocomplete="email"
              [placeholder]="'User' | translate"
            />
          </mat-form-field>
          <mat-form-field>
            <mat-label for="password">{{ 'Password' | translate }}</mat-label>
            <input
              matInput
              type="password"
              formControlName="password"
              name="password"
              id="password"
              autocomplete="new-password"
              placeholder="********"
            />
          </mat-form-field>

          <div class="d-flex flex-column">
            <div class="row">
              <div class="col-md-12 d-grid">
                <button
                  mat-flat-button
                  type="submit"
                  color="primary"
                  class="mb-3"
                  [disabled]="(logging$ | async) || form.invalid"
                >
                  {{ 'Log in' | translate }}
                </button>
              </div>
              <div class="col-md-12 text-center">
                <a [routerLink]="['/reset-password']">
                  {{ 'Forgot password' | translate }}
                </a>
              </div>
              <div class="col-md-12 text-center mt-2 powered">
                <h6 class="clear-text">
                  Powered by
                  <a [href]="'https://skooltrak.com'" [target]="'_blank'"
                    ><img src="assets/img/logo-horizontal.png" alt=""
                  /></a>
                </h6>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="welcome-message d-none d-lg-block">
      <img
        class="logo mb-4"
        src="assets/img/logo-horizontal-light.png"
        alt=""
      />
      <h3 class="text-white mega-text">Bienvenido a Skooltrak</h3>
      <h4 class="text-white titan-text">Plataforma educativa virtual</h4>
    </div>
  `,
  styles: [
    `
      .bg-white {
        height: 100vh;
      }

      .back {
        background-image: url('/assets/img/classroom-bg.jpeg');
        background-size: cover;
        margin-left: 0;
        margin-right: 0;
      }

      .login-buttons {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 24px;
      }

      .form-container {
        padding-left: 6rem;
        padding-right: 6rem;
      }

      .form-container {
        padding-left: 2rem;
        padding-right: 2rem;
      }

      @media screen and (min-width: 1280px) {
        .form-container {
          padding-left: 3rem;
          padding-right: 3rem;
        }
      }

      @media screen and (min-width: 1440px) {
        .form-container {
          padding-left: 6rem;
          padding-right: 6rem;
        }
      }

      .card-title {
        font-weight: 400;
        text-transform: uppercase;
        font-size: 48px;
        line-height: 65px;
        color: rgba(0, 0, 0, 0.7);
      }

      .main {
        width: 100%;
      }

      .crest {
        max-height: 120px;
        width: unset;
      }

      .logo {
        max-height: 70px;
        width: unset;
      }

      .welcome-message {
        position: absolute;
        bottom: 40px;
        left: 30px;
      }

      .or {
        margin: 5px 0;
        text-align: center;
        font-weight: bold;
        font-size: 1rem;
      }

      span {
        text-align: center;
        margin-top: 5px;
      }

      .card {
        border-radius: 20px;
      }

      .button-google {
        background: rgba(221, 90, 90, 0.27);
        color: #b14747;
      }

      .button-facebook {
        background: rgba(35, 65, 141, 0.28);
        color: #2340aa;
      }

      .button-twitter {
        background: rgba(90, 174, 221, 0.21);
        color: #39afff;
      }

      .icon-col {
        display: flex;
        align-items: center;

        i {
          margin-left: 15px;
          font-size: 22px;
        }
      }

      .login-input {
        border-radius: 7px;
        height: unset;
        border: 1px solid transparent !important;
        background-color: hsl(210, 9%, 96%);
        margin-bottom: 1rem;
      }

      .form-label-group {
        font-size: 1rem;
      }

      .btn {
        margin-bottom: 0.5rem;
      }

      .powered {
        img {
          height: 35px;
        }
      }

      mat-progress-bar {
        position: absolute;
      }

      .form-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  logging$ = this.store.logging$;
  constructor(private readonly store: auth.AuthFacade) {}

  ngOnInit(): void {
    this.store.init();
  }

  signIn(): void {
    const { username, password } = this.form.getRawValue();
    this.store.signIn(username, password);
  }
}
