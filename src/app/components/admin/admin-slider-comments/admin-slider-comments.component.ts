import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Swiper} from "swiper";
import {Comment} from "../../../../interfaces/Comment";
import { register } from 'swiper/element/bundle';
import { Navigation} from "swiper/modules"

@Component({
  selector: 'app-admin-slider-comments',
  templateUrl: './admin-slider-comments.component.html',
  styleUrls: ['./admin-slider-comments.component.scss']
})
export class AdminSliderCommentsComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  swiper?: Swiper;
  @Input() comments?: Comment[];

  swiperEl = document.querySelector('swiper-container');
  constructor() {
    this.swiperEl = document.querySelector('swiper-container')
    register();

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    const swiperEl = Object.assign(this.swiperRef.nativeElement, {
      // modules: [Navigation],
      loop: false,
      params: {
        loop: false
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        570: {
          slidesPerView: 1.3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        1000: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1300: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1700: {
          slidesPerView: 2,
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

  addNewSlide(): void {
    let newSlide = {
      id: 0,
      photo: "",
      name: "",
      date: "",
      rating: 5,
      comment: "",
      tableName: ""
    }
    this.comments?.push(newSlide);

    setTimeout( ()=> {
      this.swiper.update()
      this.swiper.updateSlides()
      this.swiper.setProgress(1, 500);
    })
  }
  updateSlider(): void {
    setTimeout( ()=> {
      this.swiper.update()
      this.swiper.updateSlides()
      // this.swiper.setProgress(1, 500);
    })
  }
}
