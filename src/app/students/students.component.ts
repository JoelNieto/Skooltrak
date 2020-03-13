import { Component, OnInit } from '@angular/core';

import { SignalRService } from '../shared/services/signalr.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {
  constructor(private signalR: SignalRService) {}

  ngOnInit() {
    this.signalR.startConnection();
  }
}
