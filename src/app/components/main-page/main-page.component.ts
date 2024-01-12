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
import {BalletShowItemsServiceAdditional} from "../../services/getBalletShowItemsAdditional";
import {ParodyItemsServiceAdditional} from "../../services/getParodyItemsAdditional";
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
              private balletShowItemsServiceAdditional: BalletShowItemsServiceAdditional,
              private parodyItemsService: ParodyItemsService,
              private parodyItemsServiceAdditional: ParodyItemsServiceAdditional,
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
      // this.tableName = this.hrefPageName == 'ballet-show' ? 'BalletPage' : "ParodyPage";
      if (this.hrefPageName == 'ballet-show') {
        this.tableName = 'BalletPage'
        this.getItems('balletShowItems');
        this.getItemsAdditional('balletShowItemsAdditional');
      } else {
        this.tableName = 'ParodyPage'
        this.getItems('parodyItems');
        this.getItemsAdditional('parodyItemsAdditional');
      }
      this.apiService.getMainPage(this.tableName).subscribe(data=>{
        this.pageData = data[0];
        let mainText = {
          mainText_ua: this.pageData.mainText_ua,
          mainText_en: this.pageData.mainText_en,
        }
        this.mainPageService.changeMainText$(mainText);
      })
    })
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

  getItemsAdditional(tableName: string) :void {
    this.apiService.getMostPopularItems(tableName).subscribe({
      next: (v) => {
        if (tableName == 'balletShowItemsAdditional') {
          this.balletShowItemsServiceAdditional.changeBalletShowItemsAdditional(v);
        } else if (tableName == 'parodyItemsAdditional') {
          this.parodyItemsServiceAdditional.changeParodyItemsAdditional(v);
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
}
