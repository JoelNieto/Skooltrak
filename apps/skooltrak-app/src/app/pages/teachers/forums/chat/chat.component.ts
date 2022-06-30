import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DocumentsFormComponent } from 'src/app/shared/components/documents-form/documents-form.component';
import { UploadFile } from 'src/app/shared/models/documents.model';
import { Forum, ForumPost } from 'src/app/shared/models/forums.model';
import { AvatarPipe } from 'src/app/shared/pipes/avatar.pipe';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { ForumsService } from 'src/app/shared/services/forums.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  @Input() forum: Forum;
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
      ['insert', ['picture', 'link', 'video']],
      ['view', ['help']],
    ],
  };
  constructor(
    private session: SessionService,
    private translate: TranslocoService,
    public signal: SignalRService,
    private avatarPipe: AvatarPipe,
    public filesService: FilesService,
    private modal: NgbModal,
    private documentsService: DocumentsService,
    private forumsService: ForumsService
  ) {}

  ngOnInit(): void {
    this.signal.clearStream();
    this.forumsService.get(this.forum.id).subscribe({
      next: (res) => {
        this.listen(res.id);
        this.posts$ = this.forumsService.getPosts(res.id);
      },
      error: (err) => console.error(err),
    });
  }

  listen(id: string): void {
    this.signal.hubConnection.on(id, (post: ForumPost) => {
      this.newPosts.unshift(post);
    });
  }

  addPost(): void {
    const post: ForumPost = {
      content: this.postField,
      forum: { id: this.forum.id, name: this.forum.name },
    };
    this.forumsService
      .addPost(this.forum.id, post)
      .subscribe({ next: () => {}, error: (err) => console.error(err) });
    this.postField = '';
  }

  async deletePost(id: string): Promise<void> {
    const result = await Swal.fire({
      title: this.translate.translate('Wanna delete this post?'),
      text: this.translate.translate('This cant be undone'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#F56565',
      cancelButtonColor: '#718096',
      cancelButtonText: this.translate.translate('Cancel'),
      confirmButtonText: this.translate.translate('Confirm delete'),
    });
    if (result.isConfirmed) {
      this.forumsService.deletePost(this.forum.id, id).subscribe({
        next: () => {
          this.posts$ = this.forumsService.getPosts(this.forum.id);
          this.newPosts = [];
          Swal.fire(
            this.translate.translate('Post deleted successfully'),
            '',
            'info'
          );
        },
        error: (err) => console.error(err),
      });
    }
  }

  uploadFile(): void {
    this.modal.open(DocumentsFormComponent).result.then((res: UploadFile) => {
      res.forum = { id: this.forum.id, name: this.forum.name };
      this.documentsService
        .create(res)
        .pipe(
          mergeMap(() => {
            const post: ForumPost = {
              content: `${this.session.currentUser.displayName} subió el archivo ${res.name}`,
              forum: { id: this.forum.id, name: this.forum.name },
              file: res,
              type: 'file',
            };
            return this.forumsService.addPost(this.forum.id, post);
          })
        )
        .subscribe({ next: () => {}, error: (err) => console.error(err) });
    });
  }

  getFileIcon(file: UploadFile): string {
    switch (file.file.type) {
      case 'application/pdf':
        return 'far fa-2x fa-file-pdf danger-text';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'far fa-2x fa-file-excel success-text';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'far fa-2x fa-file-word primary-text';
      case 'image/jpeg':
      case 'image/png':
        return 'far fa-2x fa-image secondary-text';
      case 'audio/mpeg':
        return 'far fa-2x fa-file-audio secondary-text';
      default:
        return 'fas fa-2x fa-file-download primary-text';
    }
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