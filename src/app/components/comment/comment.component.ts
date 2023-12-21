import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
// import SwiperCore, {Swiper, SwiperOptions,Virtual } from 'swiper';
// import {SwiperComponent} from "swiper/angular";
import {Comment} from "../../../interfaces/Comment";
// install Swiper modules
// SwiperCore.use([Virtual]);


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements AfterViewInit, OnInit {
  @Input() comment?: Comment;
  @Input() showALll: boolean = false;
  @ViewChild('commentElem') commentElem: ElementRef<HTMLDivElement> | undefined;

  public innerWidth: any;
  public elemOffsetHeight: any;

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.elemOffsetHeight = this.commentElem?.nativeElement.offsetHeight;
    }, 0)
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.elemOffsetHeight = this.commentElem?.nativeElement.offsetHeight;
  }

  onSlideChange() {
    console.log('slide change');
  }
}
