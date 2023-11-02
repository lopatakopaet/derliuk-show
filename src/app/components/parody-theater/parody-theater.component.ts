import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../../interfaces/Item";
import * as dictionary from "../../i18n/i18n.json";
import {LangItem} from "../../../interfaces/LangInterface";

// import {register} from 'swiper/element/bundle';
// import {Swiper} from "swiper";
// import {Navigation} from "swiper/modules"
import {I18nService} from "../../services/i18n.service";

@Component({
  selector: 'app-parody-theater',
  templateUrl: './parody-theater.component.html',
  styleUrls: ['./parody-theater.component.scss']
})
export class ParodyTheaterComponent implements OnInit {

  // @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  // swiper?: Swiper;
  // swiperEl = document.querySelector('swiper-container');
  lang: LangItem = dictionary;

  // popularItemsArr = [
  //   new Item({
  //     photo: 'assets/img/delete/item-11.png',
  //     title: 'Вєрка Сердючка',
  //     descriptionUa: 'Без чого не обійдеться жодне застілля? Звичайно ж без пісень Вєрки Сердючки. Замовляйте пародиста народної зіркина Ваше свято: з мамою та шоу-балетом. Максимальна схожість з оригіналом по зовнішності. <br><br>\n' +
  //       '     У програмі: жарти, привітання, запальні пісні та танці, інтерактиви та танцювальний майстер-клас для гостей.',
  //     descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
  //       '      бразильського карнавалу на будь-якому заході. <br><br>\n' +
  //       '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
  //       '      які ідеально впишуться в тематику бразильської вечірки.',
  //     // description1: {
  //     //   en: '',
  //     //   ua: ''
  //     // }
  //
  //   }, 'ua'),
  //   new Item({
  //     photo: 'assets/img/delete/item-22.png',
  //     title: 'Ольга Полякова',
  //     descriptionUa: 'Зустрічайте! Ваша улюблена зірка - Оля Полякова! Ми знаємо, без неї жодне свято не буде яскравим. Танцювальна програма на 100% відтворює манеру та характер зірки, а пародія від Олега Дерлюка - бездоганна! <br><br>\n' +
  //       '      З нами Ваше свято стане незабутнім! Подаруйте собі та своїм близьким яскраві емоції!',
  //     descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
  //       '      бразильського карнавалу на будь-якому заході. <br><br>\n' +
  //       '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
  //       '      які ідеально впишуться в тематику бразильської вечірки.',
  //     // description1: {
  //     //   en: '',
  //     //   ua: ''
  //     // }
  //
  //   }, 'ua'),
  //   new Item({
  //     photo: 'assets/img/delete/item-33.png',
  //     title: 'Настя Каменських                ',
  //     descriptionUa: 'Виконаємо танцювальні хіти: “Попа як у Кім”, “Тримай”, “Peligroso”, “Дай мені”, “Це моя ніч”. Запалимо Ваше свято народними піснями, які обожнюють всі! <br><br>\n' +
  //       '      Наша команда запалить Ваш корпоратив, день народження чи іншу подію веселим настроєм, драйвом та позитивом!',
  //     descriptionEng: 'descriptionEng пір’я та гарячі запальні латиноамериканські танці створять атмосферу\n' +
  //       '      бразильського карнавалу на будь-якому заході. <br><br>\n' +
  //       '      В репертуарі шоу-балету “V.I.P” є три танцювальних номера у різних костюмах,\n' +
  //       '      які ідеально впишуться в тематику бразильської вечірки.',
  //     // description1: {
  //     //   en: '',
  //     //   ua: ''
  //     // }
  //
  //   }, 'ua'),
  //
  //   // {
  //   //   photo: 'assets/img/delete/item-2.png',
  //   //   title: 'Disco Show',
  //   //   description: 'Запальний номер з неперевершеною енергетикою перенесе глядача в атмосферу 80-х. <br><br> Відчуйте драйв та танцюйте прямо з нами! “V.I.P” балет подарує яскраві враження та незрівнянну атмосферу свята. З нами ваш корпоратив, весілля, день народження, клубна вечірка або презентація стануть неперевершеними! Ми танцюємо душею і можемо зробити будь-яке свято незабутнім!',
  //   // },
  //   // {
  //   //   photo: 'assets/img/delete/item-3.png',
  //   //   title: '',
  //   //   description: '',
  //   // }
  // ]

  constructor(public i18n: I18nService) {
    // this.swiperEl = document.querySelector('swiper-container')
    // register();
  }

  ngOnInit(): void {
  }

  // ngAfterViewInit(): void {
  //   // @ts-ignore: error message
  //   const swiperEl = Object.assign(this.swiperRef.nativeElement, {
  //     modules: [Navigation],
  //     breakpoints: {
  //       // when window width is >= 320px
  //       320: {
  //         slidesPerView: 1.1,
  //         spaceBetween: 20
  //       },
  //       768: {
  //         slidesPerView: 1.5,
  //         spaceBetween: 20
  //       },
  //       // when window width is >= 480px
  //       1000: {
  //         slidesPerView: 2,
  //         spaceBetween: 30
  //       },
  //       // when window width is >= 640px
  //       1024: {
  //         slidesPerView: 2.5,
  //         spaceBetween: 40
  //       },
  //       1300: {
  //         slidesPerView: 3,
  //         spaceBetween: 15
  //       }
  //     }
  //   });
  //   swiperEl.initialize();
  //
  //   // @ts-ignore
  //   this.swiper = this.swiperRef.nativeElement.swiper;
  // }

  // next(): void {
  //   // @ts-ignore: error message
  //   this.swiper.slideNext();
  // }
  //
  // prev(): void {
  //   // @ts-ignore: error message
  //   this.swiper.slidePrev();
  // }
}
