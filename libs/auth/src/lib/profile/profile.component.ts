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
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
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
