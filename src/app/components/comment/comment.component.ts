import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SwiperCore, {Swiper, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  // config: SwiperOptions = {
  //   slidesPerView: 3,
  //   spaceBetween: 50,
  //   navigation: true,
  //   pagination: { clickable: true },
  //   scrollbar: { draggable: true },
  // };

  title = 'swiper-tutorial';
  swiper?: Swiper;
  @ViewChild('swiperRef')
  swiperRef: ElementRef | undefined;
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

  public config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 25,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2.5,
      },
      1280: {
        slidesPerView: 3.5,
      }
    },
    navigation: true,
    scrollbar: {
      el: '.swiper-scrollbar',
      enabled: true,
      draggable: true
    }
  }

  constructor() { }

  ngOnInit(): void {
  }
  // onSwiper([swiper]) {
  //   console.log(swiper);
  // }
  onSlideChange() {
    console.log('slide change');
  }
}
