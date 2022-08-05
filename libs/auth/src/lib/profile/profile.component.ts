import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  profile = this.auth.user$;
  avatar$ = this.auth.avatar$;
  constructor(private readonly auth: auth.AuthFacade) {}

  ngOnInit(): void {}

  changeAvatar(event: any): void {
    event.preventDefault();
    const element: HTMLElement | null = document.getElementById('avatar');
    element?.click();
  }

  setAvatar(file: any) {
    this.auth.changeAvatar(file.target.files[0]);
  }
}
