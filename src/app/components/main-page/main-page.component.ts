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
      photo: '../../../assets/img/delete/ava1.jpg',
      name: 'Максим',
      date: '22.12.2021',
      rating: 5,
      comment: 'Спасибо большое за шоу на вчерашнем вечере!!! Очень всё понравилось ... Здоровья Вам и вашему коллективу!!! ' +
        'Будет возможность буду обращаться и советовать Вас всем ...',
    },
    {
      photo: '../../../assets/img/delete/ava2.jpg',
      name: 'Аліна Гребеник',
      date: '17.03.2021',
      rating: 5,
      comment: 'Діти зробили подарунок на ювілей та запросили сюрпризом для мене шоу-програму Олега Дерлюка. Захват та подив мій та всіх гостей не можна передати словами. Колектив - справжні професіонали своєї справи, які отримують задоволення від роботи. Яскраві костюми, різноманітний репертуар, завжди вдала імпровізація та контакт з глядачами. Якщо хочете отримати незабутні враження від свята, тоді раджу замовляти колектив Олега Дерлюка.',
    },
    {
      photo: '../../../assets/img/delete/ava3.jpg',
      name: 'Олександр та Софія',
      date: '08.09.23',
      rating: 5,
      comment: 'Дякуємо вам за чудово поставлений весільний танець за досить короткий термін!!! Гості були в захваті, приємно здивовані та розчулені☺️ Всім рекомендуємо, бо саме тут поставлять танець, який буде вам по силі, але при цьому личитиме вам! ',
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
