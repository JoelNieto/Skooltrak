import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from 'src/app/shared/services/forums.service';
import { Forum, ForumPost } from 'src/app/shared/models/forums.model';

@Component({
  selector: 'app-forums-page',
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.sass']
})
export class ForumsPageComponent implements OnInit {
  forum: Forum;
  constructor(
    private route: ActivatedRoute,
    private signal: SignalRService,
    private forumsService: ForumsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.signal.listen(params.id);
      this.forumsService.get(params.id).subscribe(res => {
        this.forum = res;
      });
    });
  }

  addPost(text: string) {
    const post: ForumPost = {
      content: text,
      forum: { id: this.forum.id, name: this.forum.name }
    };
    console.log(post);
    this.forumsService.addPost(this.forum.id, post).subscribe((res) => {
      console.log(res);
    });
  }
}
