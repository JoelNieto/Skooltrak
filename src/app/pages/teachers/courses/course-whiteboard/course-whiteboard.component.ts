import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { WhiteboardService } from 'src/app/shared/services/whiteboard.service';
declare var AwwBoard: any;
let aww: any
@Component({
  selector: 'app-course-whiteboard',
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: './course-whiteboard.component.html',
  styleUrls: ['./course-whiteboard.component.sass'],
})
export class CourseWhiteboardComponent implements OnInit {
  constructor(private awwService: WhiteboardService) {
    awwService.load('AwwScript').then((data) => {
      aww = new AwwBoard('#aww-wrapper', {
        apiKey: '5a7e7a51-2d51-4266-9853-34f8de2f79b4',
        autojoin: true,
        boardLink: '5aj5342-56tz-uhjk-9874',
        sizes: [3, 5, 8, 13, 20],
        fontSizes: [10, 12, 16, 22, 30],
        menuOrder: ['colors', 'sizes', 'tools', 'admin', 'utils'],
        tools: ['pencil', 'eraser', 'text', 'image'],
        colors: [
          '#000000',
          '#f44336',
          '#4caf50',
          '#2196f3',
          '#ffc107',
          '#9c27b0',
          '#e91e63',
          '#795548',
        ],
        defaultColor: '#000000',
        defaultTool: 'pencil',
      });
    });
  }

  ngOnInit(): void {
  }
}
