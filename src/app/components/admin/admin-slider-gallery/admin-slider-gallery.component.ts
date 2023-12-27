import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Swiper} from "swiper";
import {GallerySlider} from "../../../../interfaces/gallerySlider";
import { register } from 'swiper/element/bundle';
import { Navigation} from "swiper/modules"
// @ts-ignore
import GLightbox from 'glightbox';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-admin-slider-gallery',
  templateUrl: './admin-slider-gallery.component.html',
  styleUrls: ['./admin-slider-gallery.component.scss']
})
export class AdminSliderGalleryComponent implements AfterViewInit, OnInit {

  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  swiper?: Swiper;
  @Input() comments: any;
  // @Input() gallery?: GallerySlider[];
  gallery?: GallerySlider[]
  lightbox:any;
  @Input() galleryIndicator?: string | number; // принадлежность слайдов к странице или номеру

  swiperEl = document.querySelector('swiper-container');
  constructor(private apiService: ApiService) {
    this.swiperEl = document.querySelector('swiper-container')
    register();
  }

  ngOnInit(): void {
    if (this.galleryIndicator) {
      this.getSliderGalleryItems(this.galleryIndicator);
    }
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
        768: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        // when window width is >= 480px
        1000: {
          slidesPerView: 1.2,
          spaceBetween: 30,
          // width: 700
        },
        // when window width is >= 640px
        1024: {
          slidesPerView: 2,
          spaceBetween: 40,

        },
        1300: {
          slidesPerView: 2,
          spaceBetween: 40
        }
      }
    });
    swiperEl.initialize();

    // @ts-ignore
    this.swiper = this.swiperRef.nativeElement.swiper;

    //lightbox settings
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

  addNewSlide(): void {
    let newSlide = {
      photo: '',
      youtubeLink: '',
      id: 0,
      idPosition: 0,
      indicator: this.galleryIndicator,
    }
    this.gallery?.push(newSlide);
    setTimeout( ()=> {
      this.swiper.update()
      this.swiper.updateSlides()
      this.swiper.setProgress(1, 500);
    })
  }

  getSliderGalleryItems(galleryIndicator: string | number): void {
    if (galleryIndicator) {
      this.apiService.getSliderGalleryItems(galleryIndicator).subscribe({
        next: (v) => {
          this.gallery = v;
          if (!this.gallery?.length) {
            this.addNewSlide();
          }
          this.updateSlider();
        },
        error: (e) => {
          this.updateSlider();
        },
        complete: () => {}
      })
    }
  }

  updateSlider(): void {
    setTimeout( ()=> {
      this.swiper.update()
      this.swiper.updateSlides()
      // this.swiper.setProgress(1, 500);
    })
  }
  updateSliderItems(): void {
    if (this.galleryIndicator) {
      this.getSliderGalleryItems(this.galleryIndicator);
    }
  }

}
