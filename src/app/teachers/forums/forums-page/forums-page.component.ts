import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Forum, ForumPost } from 'src/app/shared/models/forums.model';
import { ForumsService } from 'src/app/shared/services/forums.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forums-page',
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.sass']
})
export class ForumsPageComponent implements OnInit {
  forum: Forum;
  postField: string;
  posts: Observable<ForumPost[]>;
  newPosts: ForumPost[] = [];
  constructor(
    private route: ActivatedRoute,
    private session: SessionService,
    private translate: TranslateService,
    public signal: SignalRService,
    private forumsService: ForumsService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.signal.clearStream();
      this.forumsService.get(params.id).subscribe(res => {
        this.forum = res;
        this.listen(res.id);
        this.posts = this.forumsService.getPosts(res.id);
      });
    });
  }

  listen(id: string) {
    this.signal.hubConnection.on(id, (post: ForumPost) => {
      if (post.createdBy.id !== this.session.currentUser.id) {
      }
      this.newPosts.unshift(post);
    });
  }

  addPost() {
    const post: ForumPost = {
      content: this.postField,
      forum: { id: this.forum.id, name: this.forum.name }
    };
    this.forumsService.addPost(this.forum.id, post).subscribe(() => {});
    this.postField = '';
  }

  deletePost(id: string) {
    Swal.fire({
      title: this.translate.instant('Wanna delete this post?'),
      text: this.translate.instant('This cant be undone'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#F56565',
      cancelButtonColor: '#718096',
      cancelButtonText: this.translate.instant('Cancel'),
      confirmButtonText: this.translate.instant('Confirm delete')
    }).then(result => {
      if (result.value) {
        this.forumsService.deletePost(this.forum.id, id).subscribe(() => {
          this.posts = this.forumsService.getPosts(this.forum.id);
          this.newPosts = [];
          Swal.fire(
            this.translate.instant('Post deleted successfully'),
            '',
            'info'
          );
        });
      }
    });
  }

  postOwn(post: ForumPost): boolean {
    return this.session.currentUser.id === post.createdBy.id;
  }
}
