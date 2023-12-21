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
import {Item} from "../../../interfaces/Item";
import {BalletShowItemsService} from "../../services/getBalletShowItems";
import {ParodyItemsService} from "../../services/getParodyItems";
import {ContactsService} from "../../services/contacts.service";
import {CommentsService} from "../../services/comments.service";
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

  private subs?: Subscription;

  comments?: Comment[];
  currentRoute?: string;
  // swiperEl = document.querySelector('swiper-container');
  constructor(private router: Router,
              private mainPageService: MainPageService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              public i18n: I18nService,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              private commentsService: CommentsService
              ) {
    // this.swiperEl = document.querySelector('swiper-container')
    // register();


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

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
        // this.mainPageService.mainText$.subscribe(text => console.log('ballet', text));
      })
    })
    this.getItems('balletShowItems');
    this.getItems('parodyItems');
    this.getComments();

  }

  ngOnDestroy(): void {
    // отмена подписки
    this.subs?.unsubscribe();
  }

  getItems(tableName: string) :void {
    this.apiService.getMostPopularItems(tableName).subscribe({
      next: (v) => {
        if (tableName == 'balletShowItems') {
          this.balletShowItemsService.changeBalletShowItems(v);
        } else if (tableName == 'parodyItems') {
          this.parodyItemsService.changeParodyItems(v);
        }
      },
      error: (e) => {},
      complete: () => {}
    })
  }

  getComments(): void {
    this.comments = this.commentsService.comments;
    this.subs = this.commentsService.comments$.subscribe(comments => {
      this.comments = comments;
    });
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
