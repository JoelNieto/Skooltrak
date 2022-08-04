import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { auth } from '@skooltrak-app/state';

@Component({
  selector: 'skooltrak-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  profile = this.auth.user$;
  avatar$ = this.auth.avatar$;
  constructor(private readonly auth: auth.AuthFacade) {}

  ngOnInit(): void {}
}
