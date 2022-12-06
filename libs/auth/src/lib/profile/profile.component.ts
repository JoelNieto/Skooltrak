import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { auth } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule, MatButtonModule],
  template: `
    <div class="d-flex align-items-center justify-content-center row">
      <div class="col-lg-6">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ 'Profile' | translate }}</mat-card-title>
            <mat-card-subtitle>{{ 'Details' | translate }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="d-flex align-items-center justify-content-around my-2">
              <img [src]="avatar$ | async" class="avatar" alt="Avatar" />
              <button
                mat-flat-button
                color="primary"
                (click)="changeAvatar($event)"
              >
                {{ 'Change avatar' | translate }}
              </button>
            </div>
            <input
              class="invisible"
              (change)="setAvatar($event)"
              accept="image/png, image/jpeg"
              type="file"
              name="avatar"
              id="avatar"
            />
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .avatar {
        height: 7rem;
        width: 7rem;
        border-width: 2px;
        border: 4px solid var(--primary-700);
        border-radius: 50%;
        flex-shrink: 0;
        margin-right: 1rem;
        object-fit: cover;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  profile$ = this._auth.user$;
  avatar$ = this._auth.avatar$;
  constructor(private readonly _auth: auth.AuthFacade) {}

  changeAvatar(event: any): void {
    event.preventDefault();
    const element: HTMLElement | null = document.getElementById('avatar');
    element?.click();
  }

  setAvatar(file: any) {
    this._auth.changeAvatar(file.target.files[0]);
  }
}
