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
// @ts-ignore
import GLightbox from 'glightbox';
import {GallerySlider} from "../../../interfaces/gallerySlider";
import {ApiService} from "../../services/api.service";
@Component({
  selector: 'app-slider-gallery',
  templateUrl: './slider-gallery.component.html',
  styleUrls: ['./slider-gallery.component.scss']
})
export class SliderGalleryComponent implements AfterViewInit, OnInit {
  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  swiper?: Swiper;
  @Input() comments: any;
  @Input() indicator?: string | number;
  @Input() gallery?: GallerySlider[];
  lightbox:any;
  // gallery?: GallerySlider[];
  swiperEl = document.querySelector('swiper-container');
  constructor(private apiService: ApiService) {
    this.swiperEl = document.querySelector('swiper-container')
    register();
  }

  ngOnInit(): void {
    // if (this.indicator) {
    //   this.getSliderGalleryItems(this.indicator)
    // }
  }

  ngAfterViewInit(): void {
    // @ts-ignore: error message
    const swiperEl = Object.assign(this.swiperRef.nativeElement, {
      modules: [Navigation],
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.1,
          spaceBetween: 20,
        },
        360: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        400: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        430: {
          slidesPerView: 1.3,
          spaceBetween: 20,
        },
        450: {
          slidesPerView: 1.4,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
        570: {
          slidesPerView: 1.3,
          spaceBetween: 20,
        },
        571: {
          slidesPerView: 1.1,
          spaceBetween: 20,
        },
        650: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        670: {
          slidesPerView: 1.3,
          spaceBetween: 20,
        },
        680: {
          slidesPerView: 1.4,
          spaceBetween: 20,
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
        1220: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1300: {
          slidesPerView: 2.5,
          spaceBetween: 40
        }
        ,
        1440: {
          slidesPerView: 3,
          spaceBetween: 15
        }
      }
    });
    swiperEl.initialize();

    // @ts-ignore
    this.swiper = this.swiperRef.nativeElement.swiper;

    // //lightbox settings
    this.lightbox = GLightbox({
      selector: ".glightbox"
    });
  }

  next(): void {
    // @ts-ignore: error message
    this.swiper.slideNext();
  }
  prev(): void {
    // @ts-ignore: error message
    this.swiper.slidePrev();
  }

  getSliderGalleryItems(galleryIndicator: string | number): void {
    if (galleryIndicator) {
      this.apiService.getSliderGalleryItems(galleryIndicator).subscribe({
        next: (v) => {
          this.gallery = v;
        },
        error: (e) => {},
        complete: () => {}
      })
    }
  }

}
