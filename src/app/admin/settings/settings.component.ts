import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToSetting(destination: string) {
    this.router.navigate([destination], { relativeTo: this.route });
  }
}
