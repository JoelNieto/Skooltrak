import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/models/forums.model';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from 'src/app/shared/services/forums.service';

@Component({
  selector: 'app-forums-page',
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.sass']
})
export class ForumsPageComponent implements OnInit {
  forum: Forum;
  constructor(
    private route: ActivatedRoute,
    private forumsService: ForumsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.forumsService.get(params.id).subscribe(res => {
        this.forum = res;
      });
    });
  }

}
