import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { auth } from '@skooltrak-app/state';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'skooltrak-dashboard',
  template: `<mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #drawer
      class="sidenav"
      fixedInViewport
      [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
      [mode]="(isHandset$ | async) ? 'over' : 'side'"
      [opened]="(isHandset$ | async) === false"
    >
      <mat-toolbar>{{ 'Skooltrak' | translate }}</mat-toolbar>
      <mat-nav-list>
        <a mat-list-item [routerLink]="['home']" [routerLinkActive]="'active'">
          <mat-icon matListItemIcon fontSet="material-icons-round"
            >home_round</mat-icon
          >
          <p matListItemTitle>{{ 'Home' | translate }}</p>
        </a>

        <a
          mat-list-item
          [routerLink]="['messages']"
          [routerLinkActive]="'active'"
        >
          <mat-icon matListItemIcon>drafts</mat-icon>
          <p matListItemTitle>{{ 'Messages' | translate }}</p></a
        >

        <ng-container *ngFor="let link of links$ | async">
          <a
            *ngIf="link.route"
            mat-list-item
            [routerLink]="[link.route]"
            [routerLinkActive]="'active'"
          >
            <mat-icon matListItemIcon>{{ link.icon }}</mat-icon>
            <p matListItemTitle>{{ link.title! | translate }}</p></a
          >
          <div *ngIf="!link.route" mat-subheader>
            {{ link.title! | translate }}
          </div>
        </ng-container>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button
          type="button"
          aria-label="Toggle sidenav"
          mat-icon-button
          (click)="drawer.toggle()"
          *ngIf="isHandset$ | async"
        >
          <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
        </button>
        <span>Skooltrak</span>
        <div class="flex-spacer"></div>
        <button mat-flat-button [matMenuTriggerFor]="menu" color="primary">
          <img class="avatar" [src]="avatar$ | async" alt="" />
          {{ (user$ | async)?.displayName }}
        </button>
        <mat-menu #menu="matMenu">
          <a mat-menu-item [routerLink]="['profile']">
            <mat-icon>account_circle</mat-icon>
            <span>{{ 'Profile' | translate }}</span>
          </a>
          <button mat-menu-item (click)="authentication.signOut()">
            <mat-icon>logout</mat-icon>
            <span>{{ 'Sign out' | translate }}</span>
          </button>
        </mat-menu>
      </mat-toolbar>
      <div class="container">
        <ng-content select="[main]"></ng-content>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container> `,
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .flex-spacer {
        flex: 1 1 auto;
      }

      .active {
        mat-icon {
          color: var(--primary-700);
        }
      }

      .container {
        padding-top: 2rem;
        padding-bottom: 2rem;
      }

      .avatar {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-right: 1rem;
        object-fit: cover;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    RouterModule,
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public readonly authentication = inject(auth.AuthFacade);
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user$ = this.authentication.user$;
  avatar$ = this.authentication.avatar$;
  links$ = this.authentication.links$;

  ngOnInit(): void {
    this.authentication.loadUserInfo();
  }
}
