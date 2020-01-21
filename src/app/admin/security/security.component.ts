import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToSetting(destination: string) {
    this.router.navigate([destination], { relativeTo: this.route });
  }
}
