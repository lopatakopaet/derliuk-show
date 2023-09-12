import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Comment} from "../../../interfaces/Comment";
import { register } from 'swiper/element/bundle';
import { Swiper} from "swiper";
import { Navigation} from "swiper/modules"


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent  implements AfterViewInit, OnInit {
  // @Output() next = new EventEmitter();
  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  swiper?: Swiper;

  comments: Comment[] = [
    {
      photo: '../../../assets/img/delete/ava.png',
      name: 'Анна1',
      date: '14.10.2021',
      rating: 5,
      comment: 'Вдячна колективу VIP за феєричну атмомсферу свята.\n' +
        '    Наші гості були у захваті, а наша родина назавжди запам’ятає цей Юбілей.\n' +
        '    Дякуємо за ваш професіоналізм і незабутній настрій!',
    },
    {
      photo: '../../../assets/img/delete/ava2.png',
      name: 'Anna2',
      date: '14.10.2023',
      rating: 4,
      comment: 'Замовляли шоу-програму на весілля і дуже задовлені! ' +
        'Приємно здивував репертуар, який був до смаку і нам, і нашим гостям. ' +
        'Настрій і атмосфера свята вдались!',
    },
    {
      photo: '../../../assets/img/delete/ava.png',
      name: 'Марина та Тарас3',
      date: '14.10.2021',
      rating: 5,
      comment: 'Вдячна колективу VIP за феєричну атмомсферу свята.\n' +
        '    Наші гості були у захваті, а наша родина назавжди запам’ятає цей Юбілей.\n' +
        '    Дякуємо за ваш професіоналізм і незабутній настрій!',
    },
    {
      photo: '../../../assets/img/delete/ava2.png',
      name: 'Anna4',
      date: '14.10.2023',
      rating: 4,
      comment: 'Замовляли шоу-програму на весілля і дуже задовлені! ' +
        'Приємно здивував репертуар, який був до смаку і нам, і нашим гостям. ' +
        'Настрій і атмосфера свята вдались!',
    },
    {
      photo: '../../../assets/img/delete/ava.png',
      name: 'Марина та Тарас5',
      date: '14.10.2021',
      rating: 5,
      comment: 'Вдячна колективу VIP за феєричну атмомсферу свята.\n' +
        '    Наші гості були у захваті, а наша родина назавжди запам’ятає цей Юбілей.\n' +
        '    Дякуємо за ваш професіоналізм і незабутній настрій!',
    }, {
      photo: '../../../assets/img/delete/ava2.png',
      name: 'Anna6',
      date: '14.10.2023',
      rating: 4,
      comment: 'Замовляли шоу-програму на весілля і дуже задовлені! ' +
        'Приємно здивував репертуар, який був до смаку і нам, і нашим гостям. ' +
        'Настрій і атмосфера свята вдались!',
    },
  ]

  swiperEl = document.querySelector('swiper-container');
  buttonEl = document.querySelector('button');



//   buttonEl.addEventListener('click', () => {
//   swiperEl.swiper.slideNext();
// });
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
          slidesPerView: 1.1,
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
