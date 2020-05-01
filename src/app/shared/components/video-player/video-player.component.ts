import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs, { VideoJsPlayerOptions } from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  @Input() options: VideoJsPlayerOptions;

  player: videojs.Player;
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.startPlayer();
  }

  startPlayer(): void {
    console.log(this.options);
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      }
    );
  }

  public resetPlayer(src: { src: string; type: string }) {
    this.player.src(src);
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
