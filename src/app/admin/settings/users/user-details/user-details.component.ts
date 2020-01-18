import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/users.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private usersServ: UsersService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usersServ.get(params.id).subscribe(res => {
        this.user = res;
      });
    });
  }
}
