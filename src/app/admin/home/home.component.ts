import { Component, OnInit } from '@angular/core';
import { ChargesService } from 'src/app/shared/services/charges.service';
import { Observable } from 'rxjs';
import { Summary } from 'src/app/shared/models/charges.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  due: Observable<Summary[]>;
  constructor(private chargesServ: ChargesService) { }

  ngOnInit() {
    this.due = this.chargesServ.getDue();
  }

}
