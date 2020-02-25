import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AnnouncementService } from 'src/app/shared/services/announcements.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrls: ['./new-announcement.component.sass']
})
export class NewAnnouncementComponent implements OnInit {
  form: FormGroup;
  config = {
    lang: 'es-ES',
    placeholder: '',
    tabsize: 2,
    height: 300,
    minHeight: 300,
    uploadImagePath: '',
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
          'clear'
        ]
      ],
      ['fontsize', ['fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ]
  };
  constructor(
    private fb: FormBuilder,
    private announcementServ: AnnouncementService,
    private translate: TranslocoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      activeSince: ['', Validators.required],
      activeUntil: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
  }

  saveAnnouncement() {
    this.announcementServ.create(this.form.value).subscribe(res => {
      Swal.fire(
        res.title,
        this.translate.translate('Created item', {
          value: this.translate.translate('Announcement')
        }),
        'success'
      );
    });
    this.router.navigate(['./'], { relativeTo: this.route.parent });
  }
}
