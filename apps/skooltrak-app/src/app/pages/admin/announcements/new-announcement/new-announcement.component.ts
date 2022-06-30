import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AnnouncementService } from 'src/app/shared/services/announcements.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'skooltrak-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.sass'],
})
export class NewAnnouncementComponent implements OnInit {
  form: UntypedFormGroup;
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 2,
    height: 300,
    minHeight: 300,
    uploadImagePath: environment.urlAPI + 'Images',
    toolbar: [
      ['misc', ['undo', 'redo']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
  };
  constructor(
    private fb: UntypedFormBuilder,
    private announcementServ: AnnouncementService,
    private translate: TranslocoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      activeSince: ['', Validators.required],
      activeUntil: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  saveAnnouncement() {
    this.announcementServ.create(this.form.value).subscribe({
      next: (res) => {
        Swal.fire(
          res.title,
          this.translate.translate('Created item', {
            value: this.translate.translate('Announcement'),
          }),
          'success'
        );
      },
      error: (err) => console.error(err),
      complete: () =>
        this.router.navigate(['./'], { relativeTo: this.route.parent }),
    });
  }
}