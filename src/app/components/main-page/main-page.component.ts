import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Comment} from "../../../interfaces/Comment";
import {Route, ActivatedRoute, Params, Router, NavigationEnd  } from "@angular/router";
import {MainPageService} from "../../services/main-page.service";
import {Subscription } from 'rxjs';
import {ApiService} from "../../services/api.service";
import {BalletPage} from "../../../interfaces/BalletPage";
import {I18nService} from "../../services/i18n.service";
import {LangItem} from "../../../interfaces/LangInterface";
import * as dictionary from "../../i18n/i18n.json";
// import { register } from 'swiper/element/bundle';
// import { Swiper} from "swiper";
// import { Navigation} from "swiper/modules"


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent  implements OnInit {
  mainPhoto: string = '';
  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицой работаем]
  hrefPageName: string = "ballet-page"// название страницы из url
  lang: LangItem = dictionary;
  pageData: BalletPage = {
    id: 1,
    mainPhoto: '',
    mainText_ua: '',
    mainText_en: '',
    seoText_ua: '',
    seoText_en: '',
  };

  private subs?: Subscription; // подписка на баннер ( передаем из дочернего компонента)

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
      photo: '../../../assets/img/delete/ava4.jpg',
      name: 'Anna4',
      date: '20.09.2020',
      rating: 4,
      comment: 'Олег, ми з жінкою хочемо написати відгук про вашу роботу!\n' +
        'Коли ми з вами домовлявся про виступ вашого гурту, то ми і уявити не могли як відреагують наші гості на ваш виступ!\n' +
        'Це неймовірно!!!\n' +
        'Я довго думав яку програму замовити для нашого свята, бачив в житті багато, але те що ви зробили, це просто АГОНЬ🔥💪!\n' +
        'Гості були різного статусу та віку, ви підкорили серця всіх, скільки позитивних відгуків я давно не чув від своїх родичів)Це було 45 хвилин вибуху емоцій!\n' +
        'Ви та ваша команда дуже талановиті професіонали!\n' +
        'Тому всім хто читає ці відгуки та ще вирішує чи замовляти послуги команди Олега, повірте вам каже ведучий з 15 річним стажем який бачив в житті багато шоу програм, тому замовляйте і не хвилюйтесь, ви залишитесь задоволені на 1000%\n' +
        'Рекомендував і буду рекомендувати вас!!!\n' +
        'З повагою родина Кравченко',
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
  currentRoute?: string;
  // swiperEl = document.querySelector('swiper-container');
  constructor(private router: Router,
              private mainPageService: MainPageService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              public i18n: I18nService,
              ) {
    // this.swiperEl = document.querySelector('swiper-container')
    // register();
    console.log(router.url);


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //   }
    // });

    // this.route.params.subscribe(params => {
    //   if (this.fullMode) {
    //     this.itemId = this.route.snapshot.paramMap.get('id') || "0";
    //     if (this.itemId === "0") {
    //       this.itemId = null;
    //     } else {
    //       this.getBalletShowItem(this.itemId)
    //     }
    //   }
    // })


    // @ts-ignore
    // router.events.filter(event => event instanceof NavigationEnd)
    //   // @ts-ignore
    //   .subscribe(event =>
    //   {
    //     this.currentRoute = event.url;
    //     console.log(event);
    //   });
  }

  ngOnInit(): void {
    // смена данных при переключением между пародиями и балетом
    this.route.params.subscribe(params => {
      let href = this.router.url;
      this.hrefPageName = href.split('/').slice(-1).join();
      this.tableName = this.hrefPageName == 'ballet-show' ? 'BalletPage' : "ParodyPage";
      this.apiService.getMainPage(this.tableName).subscribe(data=>{
        this.pageData = data[0];
        let mainText = {
          mainText_ua: this.pageData.mainText_ua,
          mainText_en: this.pageData.mainText_en,
        }
        this.mainPageService.changeMainText$(mainText);
        this.mainPageService.mainText$.subscribe(text => console.log('ballet', text));
      })
    })

    // this.apiService.
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
  //         spaceBetween: 40
  //       }
  //     }
  //   });
  //   swiperEl.initialize();
  //
  //   // @ts-ignore
  //   this.swiper = this.swiperRef.nativeElement.swiper;
  // }
  //
  // next(): void {
  //   // @ts-ignore: error message
  //   this.swiper.slideNext();
  // }
  // prev(): void {
  //   // @ts-ignore: error message
  //   this.swiper.slidePrev();
  // }
}
