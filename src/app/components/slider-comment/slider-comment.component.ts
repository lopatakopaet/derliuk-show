import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter, Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper} from "swiper";
import { Navigation} from "swiper/modules"

@Component({
  selector: 'app-slider-comment',
  templateUrl: './slider-comment.component.html',
  styleUrls: ['./slider-comment.component.scss']
})
export class SliderCommentComponent implements AfterViewInit, OnInit {
  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  swiper?: Swiper;
  @Input() comments: any;

  swiperEl = document.querySelector('swiper-container');
  constructor() {
    this.swiperEl = document.querySelector('swiper-container')
    register();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore: error message
    const swiperEl = Object.assign(this.swiperRef.nativeElement, {
      modules: [Navigation],
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20
        },
        570: {
          slidesPerView: 1.3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        // when window width is >= 480px
        1000: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 40
        },
        1300: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
    swiperEl.initialize();

    // @ts-ignore
    this.swiper = this.swiperRef.nativeElement.swiper;
  }

  next(): void {
    // @ts-ignore: error message
    this.swiper.slideNext();
  }
  prev(): void {
    // @ts-ignore: error message
    this.swiper.slidePrev();
  }

}
