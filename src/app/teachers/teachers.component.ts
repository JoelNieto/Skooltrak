import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../shared/services/signalr.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass']
})
export class TeachersComponent implements OnInit {

  constructor(private signalR: SignalRService) { }

  ngOnInit() {
    this.signalR.startConnection();
  }

}
