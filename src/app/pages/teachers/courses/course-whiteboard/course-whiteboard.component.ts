import { Component, OnInit, ViewChild } from '@angular/core';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-course-whiteboard',
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: './course-whiteboard.component.html',
  styleUrls: ['./course-whiteboard.component.sass'],
})
export class CourseWhiteboardComponent implements OnInit {
  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  constructor() {}

  ngOnInit(): void {}
}
