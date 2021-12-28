import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Forum } from 'src/app/shared/models/forums.model';
import { ForumsService } from 'src/app/shared/services/forums.service';

@Component({
  selector: 'skooltrak-forums-page',
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.sass'],
})
export class ForumsPageComponent implements OnInit {
  forum: Forum;
  constructor(
    private route: ActivatedRoute,
    private forumsService: ForumsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(mergeMap((params) => this.forumsService.get(params.id)))
      .subscribe({
        next: (forum) => {
          this.forum = forum;
        },
        error: (err) => console.error(err),
      });
  }
}
