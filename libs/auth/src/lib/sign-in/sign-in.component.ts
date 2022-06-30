import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from 'libs/state/src/lib/auth';

@Component({
  selector: 'skooltrak-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
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
  form!: FormGroup;
  logging$ = this.store.logging$;
  constructor(private readonly store: AuthFacade, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.store.init();
  }

  signIn(): void {
    const { username, password } = this.form.value;
    this.store.signIn(username, password);
  }
}
