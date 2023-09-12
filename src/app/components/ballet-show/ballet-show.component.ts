import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Item from "../../../interfaces/Item";
import * as dictionary from "../../i18n/i18n.json";
import {LangItem} from "../../../interfaces/LangInterface";

import {register} from 'swiper/element/bundle';
import {Swiper} from "swiper";
import {Navigation} from "swiper/modules"
import {I18nService} from "../../services/i18n.service";

@Component({
  selector: 'app-ballet-show',
  templateUrl: './ballet-show.component.html',
  styleUrls: ['./ballet-show.component.scss']
})
export class BalletShowComponent implements AfterViewInit, OnInit {
  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  swiper?: Swiper;
  swiperEl = document.querySelector('swiper-container');
  lang: LangItem = dictionary;

  popularItemsArr = [
    new Item({
      photo: 'assets/img/delete/item-1.png',
      title: 'Brasil Show',
      descriptionUa: 'Яскаве пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
        '      бразильського карнавалу на будь-якому заході. <br>\n' +
        '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
        '      які ідеально впишуться в тематику бразильської вечірки.',
      descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
        '      бразильського карнавалу на будь-якому заході. <br>\n' +
        '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
        '      які ідеально впишуться в тематику бразильської вечірки.',
      // description1: {
      //   en: '',
      //   ua: ''
      // }

    }, 'ua'),
    new Item({
      photo: 'assets/img/delete/item-2.png',
      title: 'Disco Show',
      descriptionUa: 'Запальний номер з неперевершеною енергетикою перенесе глядача в атмосферу 80-х. <br><br>Відчуйте драйв та танцюйте прямо з нами! “V.I.P” балет подарує яскраві враження та незрівнянну атмосферу свята. З нами ваш корпоратив, весілля, день народження, клубна вечірка або презентація стануть неперевершеними! Ми танцюємо душею і можемо зробити будь-яке свято незабутнім!',
      descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
        '      бразильського карнавалу на будь-якому заході. <br>\n' +
        '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
        '      які ідеально впишуться в тематику бразильської вечірки.',
      // description1: {
      //   en: '',
      //   ua: ''
      // }

    }, 'ua'),
    new Item({
      photo: 'assets/img/delete/item-3.png',
      title: 'Antre',
      descriptionUa: 'Казково-легкий, чарівний та красивий номер стане незабутнім відкриттям програми чи івенту. А професіоналізм нашого колективу не залишить байдужим жодного гостя. Пориньте разом з нами у феєрію свята. Ми зробимо його незабутнім!',
      descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
        '      бразильського карнавалу на будь-якому заході. <br>\n' +
        '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
        '      які ідеально впишуться в тематику бразильської вечірки.',
      // description1: {
      //   en: '',
      //   ua: ''
      // }

    }, 'ua'),
    // {
    //   photo: 'assets/img/delete/item-2.png',
    //   title: 'Disco Show',
    //   description: 'Запальний номер з неперевершеною енергетикою перенесе глядача в атмосферу 80-х. <br><br> Відчуйте драйв та танцюйте прямо з нами! “V.I.P” балет подарує яскраві враження та незрівнянну атмосферу свята. З нами ваш корпоратив, весілля, день народження, клубна вечірка або презентація стануть неперевершеними! Ми танцюємо душею і можемо зробити будь-яке свято незабутнім!',
    // },
    // {
    //   photo: 'assets/img/delete/item-3.png',
    //   title: '',
    //   description: '',
    // }
  ]

  constructor(public i18n: I18nService) {
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
          spaceBetween: 15
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
