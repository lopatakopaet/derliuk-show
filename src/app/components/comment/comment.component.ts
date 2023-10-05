import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
// import SwiperCore, {Swiper, SwiperOptions,Virtual } from 'swiper';
// import {SwiperComponent} from "swiper/angular";

// install Swiper modules
// SwiperCore.use([Virtual]);


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements AfterViewInit, OnInit {
  @Input() comment: any;
  @Input() showALll: boolean = false;
  @ViewChild('commentElem') commentElem: ElementRef<HTMLDivElement> | undefined;

  public innerWidth: any;
  public elemOffsetHeight: any;










  // @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  // slideNext(){
  //   this.swiper?.swiperRef.slideNext(100);
  // }
  // slidePrev(){
  //   this.swiper?.swiperRef.slidePrev(100);
  // }
  // config: SwiperOptions = {
  //   slidesPerView: 2.5,
  //   spaceBetween: 10,
  //   navigation: true,
  //   pagination: { clickable: true },
  //   scrollbar: { draggable: true },
  //
  // };

  // title = 'swiper-tutorial';
  // swiper?: Swiper;
  // @ViewChild('swiperRef')
  // swiperRef: ElementRef | undefined;
  slides: Array<{title: string}> = [
    {
      title: "Slide 1"
    },
    {
      title: "Slide 2"
    },
    {
      title: "Slide 3"
    },
    {
      title: "Slide 4"
    },
    {
      title: "Slide 5"
    },
    {
      title: "Slide 6"
    },
    {
      title: "Slide 7"
    },
    {
      title: "Slide 8"
    },
  ]

  // public config: SwiperOptions = {
  //   slidesPerView: 1,
  //   spaceBetween: 25,
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1.5,
  //     },
  //     768: {
  //       slidesPerView: 2.5,
  //     },
  //     1280: {
  //       slidesPerView: 3.5,
  //     }
  //   },
  //   navigation: true,
  //   scrollbar: {
  //     el: '.swiper-scrollbar',
  //     enabled: true,
  //     draggable: true
  //   }
  // }

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
