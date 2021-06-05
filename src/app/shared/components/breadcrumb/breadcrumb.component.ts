import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass'],
})
export class BreadcrumbComponent {
  @Input() homePath: string;

  routes: string[];
  path: string;
  isHome: boolean;
  constructor(private location: Location, private router: Router) {
    router.events.subscribe(
      () => {
        if (location.path() !== '' && location.path() !== this.path) {
          this.routes = [];
          this.path = location.path();
          this.path.split('/').forEach((e) => {
            if (e !== '' && e !== this.homePath) {
              this.isHome = false;
              this.routes.push(e);
            } else {
              this.isHome = true;
            }
          });
        }
      },
      (err) => console.error(err)
    );
  }

  back() {
    this.location.back();
  }
}
