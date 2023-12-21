import {Component, Input, OnInit,} from '@angular/core';
import {Item} from "../../../interfaces/Item";
import * as dictionary from "../../i18n/i18n.json";
import {LangItem} from "../../../interfaces/LangInterface";

import {I18nService} from "../../services/i18n.service";
import {MainPageService} from "../../services/main-page.service";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BalletPage} from "../../../interfaces/BalletPage";
import {Subscription} from "rxjs";
import {BalletShowItemsService} from "../../services/getBalletShowItems";
import {ParodyItemsService} from "../../services/getParodyItems";

@Component({
  selector: 'app-ballet-show',
  templateUrl: './ballet-show.component.html',
  styleUrls: ['./ballet-show.component.scss']
})
export class BalletShowComponent implements OnInit {
  @Input() pageData: BalletPage = {
    id: 1,
    mainPhoto: '',
    mainText_ua: '',
    mainText_en: '',
    seoText_ua: '',
    seoText_en: '',
  };
  mainText: {
    mainText_ua: string;
    mainText_en: string;
    [key: string]: any;
  } = {
    mainText_ua: '',
    mainText_en: '',

  }
  private subs?: Subscription;
  private subsBalletShowItems?: Subscription;
  private subsParodyItems?: Subscription;
  lang: LangItem = dictionary;
  tableName: string = "BalletPage"; // для запросов в БД, указываем с какой таблицeй работаем]
  balletShowItems?: Item[];
  parodyItems?: Item[];
  hrefPageName: string = "ballet-show"// название страницы из url

  constructor(public i18n: I18nService,
              private apiService: ApiService,
              private mainPageService: MainPageService,
              private balletShowItemsService: BalletShowItemsService,
              private parodyItemsService: ParodyItemsService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    // устанавливаем имя страницы
    this.route.params.subscribe(params => {
      let href = this.router.url;
      this.hrefPageName = href.split('/').slice(-1).join();
      this.tableName = this.hrefPageName == 'ballet-show' ? 'BalletPage' : "ParodyPage";
    })

    this.subs = this.mainPageService.mainText$.subscribe(text => this.mainText = text);
    this.balletShowItems = this.balletShowItemsService.currentBalletItems;
    this.subsBalletShowItems = this.balletShowItemsService?.balletItems$.subscribe((data: Item[]) => {
      this.balletShowItems = data;
    });

    this.parodyItems = this.parodyItemsService.currentParodyItems;
    this.subsParodyItems = this.parodyItemsService?.parodyItems$.subscribe((data: Item[]) => {
      this.parodyItems = data;
    });

  }
  ngOnDestroy(): void {
    // отмена подписки
    this.subs?.unsubscribe();
    this.subsBalletShowItems?.unsubscribe();
    this.subsParodyItems?.unsubscribe();
  }

}
