import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/shared/models/assignments.model';
import { Forum, ForumPost } from 'src/app/shared/models/forums.model';
import { AvatarPipe } from 'src/app/shared/pipes/avatar.pipe';
import { AssignmentService } from 'src/app/shared/services/assignments.service';
import { ForumsService } from 'src/app/shared/services/forums.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass'],
})
export class ForumComponent implements OnInit {
  @Input() assignment: Assignment;
  forum: Forum;
  postField: string;
  posts$: Observable<ForumPost[]>;
  newPosts: ForumPost[] = [];
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 1,
    height: 100,
    minHeight: 100,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'strikethrough']],
      ['para', ['ul', 'ol']],
      ['insert', ['link', 'video']],
      ['view', ['help']],
    ],
  };
  constructor(
    private assignmentService: AssignmentService,
    public signal: SignalRService,
    private avatarPipe: AvatarPipe,
    private session: SessionService,
    private forumsService: ForumsService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.assignmentService.getForum(this.assignment.id).subscribe(
      (res) => {
        this.forum = res;
        this.initForum(res.id);
      },
      (err) => console.error(err)
    );
  }

  listen(id: string): void {
    this.signal.hubConnection.on(id, (post: ForumPost) => {
      this.newPosts.unshift(post);
    });
  }

  initForum(id: string): void {
    this.signal.clearStream();
    this.forumsService.get(id).subscribe(
      (res) => {
        this.listen(res.id);
        this.posts$ = this.forumsService.getPosts(res.id);
      },
      (err) => console.error(err)
    );
  }

  addPost(): void {
    const post: ForumPost = {
      content: this.postField,
      forum: { id: this.forum.id, name: this.forum.name },
    };
    this.forumsService.addPost(this.forum.id, post).subscribe(
      () => {},
      (err) => console.error(err)
    );
    this.postField = '';
  }

  deletePost(id: string): void {
    Swal.fire({
      title: this.transloco.translate('Wanna delete this post?'),
      text: this.transloco.translate('This cant be undone'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#F56565',
      cancelButtonColor: '#718096',
      cancelButtonText: this.transloco.translate('Cancel'),
      confirmButtonText: this.transloco.translate('Confirm delete'),
    }).then((result) => {
      if (result.value) {
        this.forumsService.deletePost(this.forum.id, id).subscribe(
          () => {
            this.posts$ = this.forumsService.getPosts(this.forum.id);
            this.newPosts = [];
            Swal.fire(
              this.transloco.translate('Post deleted successfully'),
              '',
              'info'
            );
          },
          (err) => console.error(err)
        );
      }
    });
  }

  replyPost(post: ForumPost) {
    const quote = document.createElement('blockquote');
    quote.classList.add('blockquote');
    const cite = document.createElement('p');
    cite.innerHTML = post.content;
    const footer = document.createElement('footer');
    footer.classList.add('blockquote-footer');
    footer.innerHTML = `${this.avatarPipe.transform(post.createdBy.photoURL)} ${
      post.createdBy.displayName
    }`;
    quote.appendChild(cite);
    quote.appendChild(footer);
    this.postField = quote.outerHTML;
    window.scrollTo(0, 0);
  }

  postOwn(post: ForumPost): boolean {
    return this.session.currentUser.id === post.createdBy.id;
  }
}
